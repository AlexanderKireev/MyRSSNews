import React from "react";
import { bloknotRostovPath } from "../routes";

const feeds = {
  rbc: "Читать новость на сайте РБК.ru",
  mail: "Читать новость на сайте Mail.ru",
  bloknot: "Читать новость на сайте Блокнот.ru",
};

const getBloknotComponents = (title, articleBody, link) => {
  const bodyWithoutBags = articleBody
    .replaceAll(/<\/b>\s*?<b>/g, "")
    .replaceAll(/<\/strong>\s*?<strong>/g, "")
    .replaceAll(/<\/i>\s*?<i>/g, "")
    .replaceAll(/<\/italic>\s*?<italic>/g, "")
    .replaceAll(/<script.[\s\S]*?<\/script>/g, "")
    .replaceAll(/<a\s*?>/g, "")
    .replaceAll("</a>", "");
  const [firstString, ...lastStrings] = bodyWithoutBags.split("</");
  const body = lastStrings.join("</").replaceAll("<br>", "</p>").split("</p>");
  const strings = [];
  body.forEach((str) => {
    const imgs = [];
    const imgCount = (str.match(/<img/g) || []).length;
    let prevBegin = 0;
    for (let i = 0; i < imgCount; i += 1) {
      const begin = str.indexOf("<img", prevBegin);
      const end = str.indexOf(">", begin);
      prevBegin = end;
      const img = str.slice(begin, end) + ">";
      const srcIndex = img.indexOf("src");
      const imgSrc = bloknotRostovPath + img.slice(srcIndex + 6, img.indexOf('"', srcIndex + 6));
      imgs.push(imgSrc);
    }
    imgs.forEach((img) => {
      strings.push(" ");
      strings.push(img);
    });
    const pWithoutTags = str.replaceAll(/<.*?>/g, "");
    const p = pWithoutTags
      .slice(pWithoutTags.indexOf(">") + 1)
      .replaceAll("\r", "")
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .replaceAll("&nbsp;", " ")
      .trim();
    if (p !== "") {
      strings.push(p);
    }
  });
  const description = firstString
    .replaceAll(/<.*?>/g, "")
    .replaceAll("\r", "")
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .replaceAll("&nbsp;", " ")
    .trim();
  const result = [<h2 key={0}>{`${title}`}</h2>, <h3 key={1}>{`${description}`}</h3>];
  strings.forEach((str, i) => {
    if (str[0] === "h" && str[1] === "t") {
      result.push(<img key={i + 2} className="menu-todo-logo" src={`${str}`} alt="img" />);
    } else {
      result.push(<p key={i + 2}>{`${str}`}</p>);
    }
  });
  result.push(
    <p key={strings.length + 2}>
      <a href={link} target="_blank" rel="noreferrer">
        {feeds.bloknot}
      </a>
    </p>,
  );
  for (let i = 1; i <= 3; i += 1) {
    result.push(<br key={strings.length + i + 2}></br>);
  }
  return result;
};

const getRbcAndMailComponents = (headline, articleBody, description, link, feed) => {
  const regexp =
    /(?<!\sп)(?<!\sст)(?<!\sч)(?<!\.\s*[А-Я])(?<!\sг)(?<!\sим)(?<!ул)\.\s*[А-Я«](?!\.)/g;
  const lines = articleBody.split(regexp);
  const splitFragments = articleBody.match(regexp);
  const paragraphs = [];

  lines.forEach((line, i) => {
    if (i === 0) {
      paragraphs.push(line + ".");
    } else if (i === lines.length - 1) {
      paragraphs.push(splitFragments[i - 1].slice(-1) + line);
    } else {
      paragraphs.push(splitFragments[i - 1].slice(-1) + line + ".");
    }
  });
  const result = [<h2 key={0}>{`${headline}`}</h2>, <h3 key={1}>{`${description}`}</h3>];
  paragraphs.forEach((paragraph, i) => {
    result.push(<p key={i + 2}>{`${paragraph}`}</p>);
  });
  result.push(
    <p key={paragraphs.length + 2}>
      <a href={link} target="_blank" rel="noreferrer">
        {feeds[feed]}
      </a>
    </p>,
  );

  for (let i = 1; i <= 3; i += 1) {
    result.push(<br key={paragraphs.length + i + 2}></br>);
  }
  return result;
};

const searchFullText = (content, searchText, finalText, alternativeFinalText) => {
  const indexOfContent = content.indexOf(searchText);
  if (indexOfContent < 0) {
    return "Не удалось загрузить новость";
  }
  const indexOfBegin =
    finalText === '"'
      ? content.indexOf('"', content.indexOf('"', indexOfContent) + 1) + 1
      : content.indexOf(searchText, indexOfContent + 1) + searchText.length + 2;
  const indexOfEnd =
    content.indexOf(finalText) < 0
      ? content.indexOf(alternativeFinalText)
      : content.indexOf(finalText, indexOfBegin);
  return content.slice(indexOfBegin, indexOfEnd);
};

const searchImgLink = (content, searchText, alternativeSearchText) => {
  const indexOfText =
    content.indexOf(searchText) < 0
      ? content.indexOf(alternativeSearchText)
      : content.indexOf(searchText);
  if (indexOfText < 0) {
    return "./src/assets/noimage.jpg";
  }
  const firstQuoteIndex = content.indexOf('"', content.indexOf('"', indexOfText) + 1) + 1;
  const lastQuoteIndex = content.indexOf('"', firstQuoteIndex);
  const result = content.slice(firstQuoteIndex, lastQuoteIndex);
  const imgLink = alternativeSearchText === "https:" ? alternativeSearchText + result : result;
  if (result[result.length - 2 - 2] === "." || result[result.length - 2 - 2 - 1] === ".") {
    return imgLink;
  } else {
    const imgLinkChars = [];
    let i = indexOfText - 2 - 1;
    let quoteCounter = 0;
    while (quoteCounter < 2) {
      if (content.charAt(i) === '"') {
        quoteCounter += 1;
      }
      if (quoteCounter === 1 && content.charAt(i) !== '"') {
        imgLinkChars.unshift(content.charAt(i));
      }
      i -= 1;
    }
    return imgLinkChars.join("");
  }
};

const getArticleContent = ({ feed, title, description, fullText, imgUrl, link }, data) => {
  let resultImgLink, articleContent, articleBody, headline;
  switch (feed) {
    case "bloknot":
      resultImgLink = searchImgLink(data, "detail_picture", "https:");
      articleBody = searchFullText(data, "news-text", "Наш сайт в соцсетях", "Новости на Блoкнoт");
      articleContent = getBloknotComponents(title, articleBody, link);
      break;
    case "mail":
      headline = searchFullText(data, "headline", '"', null);
      articleBody = searchFullText(data, "articleBody", '"', null);
      articleContent = getRbcAndMailComponents(headline, articleBody, description, link, feed);
      resultImgLink = searchImgLink(
        data,
        "yandex_recommendations_image",
        "yandex_recommendations_category",
      );
      break;
    case "rbc":
      articleContent = getRbcAndMailComponents(
        title,
        fullText ? fullText : "Новость удалена",
        description,
        link,
        feed,
      );
      resultImgLink = imgUrl;
      break;
  }
  return { resultImgLink, articleContent };
};

export default getArticleContent;
