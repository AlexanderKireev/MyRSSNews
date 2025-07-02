import { correctText } from "../constants.js";
import { bloknotRostovPath } from "../routes.js";

const convertDOMtoContetntData = (parsedDOM) => {
  const feed = {
    title: parsedDOM.querySelector("title").textContent,
    description: parsedDOM.querySelector("description").textContent,
  };
  const itemElements = parsedDOM.querySelectorAll("item");
  const items = Array.from(itemElements);
  const posts = items.map((item) => {
    const post = {
      title: item.querySelector("title").textContent,
      link: item.querySelector("link").textContent,
      description: correctText(item.querySelector("description").textContent),
      imgUrl:
        item.querySelector("image > url") !== null
          ? item.querySelector("image > url").textContent
          : "./noimage.jpg",
      fullText:
        item.querySelector("full-text") !== null
          ? correctText(item.querySelector("full-text").textContent)
          : null,
    };
    return post;
  });
  return { feed, posts };
};

export const parsingHtml = (htmlString) => {
  const liStrings = htmlString.split("</li>");
  liStrings.pop();
  const posts = liStrings.map((li) => {
    const firstTitleIndex = li.indexOf('"', li.indexOf("title=")) + 1;
    const lastTitleIndex = li.indexOf('"', firstTitleIndex);
    const firstLinkIndex = li.indexOf('"', li.indexOf("data-cackle-url")) + 1;
    const lastLinkIndex = li.indexOf('"', firstLinkIndex);
    const firstDecriptionIndx = li.indexOf(">", li.indexOf("<p", lastLinkIndex)) + 1;
    const lastDecriptionIndx = li.indexOf("</p>", firstDecriptionIndx);
    const post = {
      title: li.slice(firstTitleIndex, lastTitleIndex),
      link: bloknotRostovPath.slice(0, -1) + li.slice(firstLinkIndex, lastLinkIndex),
      description: correctText(li.slice(firstDecriptionIndx, lastDecriptionIndx))
        .replaceAll(/<.*?>/g, "")
        .replaceAll(/{.*?}/g, ""),
      imgUrl: "./noimage.jpg",
      fullText: null,
    };
    return post;
  });
  return posts;
};

const parsingUrl = (xmlString) => {
  const parser = new DOMParser();
  const parsedDOM = parser.parseFromString(xmlString, "application/xml");
  const errorNode = parsedDOM.querySelector("parsererror");
  if (errorNode) {
    const error = new Error(errorNode);
    error.parsingError = true;
    console.error(error);
    // alert("Ошибка парсера");
    return { feed: null, posts: [] };
    // throw error;
  }
  return convertDOMtoContetntData(parsedDOM);
};

export default parsingUrl;
