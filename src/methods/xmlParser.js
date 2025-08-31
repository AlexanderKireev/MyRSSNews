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
    const descr = item.querySelector("description")?.textContent
      ? correctText(item.querySelector("description").textContent)
      : "";
    const post = {
      title: item.querySelector("title").textContent,
      link: item.querySelector("link").textContent,
      description: descr,
      imgUrl:
        item.querySelector("image > url") !== null
          ? item.querySelector("image > url").textContent
          : "./src/assets/noimage.jpg",
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
  let liStrings = [];
  try {
    liStrings = htmlString.split("</li>");
  } catch {
    return liStrings;
  }
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
      imgUrl: "./src/assets/noimage.jpg",
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
    return { feed: null, posts: [] };
  }
  return convertDOMtoContetntData(parsedDOM);
};

export default parsingUrl;
