const proxyPath = "http://localhost:3001/?";
const mail61Path = "https://news.mail.ru/rss/main/61/";
const rbcRussiaPath = "https://rssexport.rbc.ru/rbcnews/news/30/full.rss";
const bloknotRostovSecondPagePath = "https://bloknot-rostov.ru/?PAGEN_1=2";
const bloknotRostovThirdPagePath = "https://bloknot-rostov.ru/?PAGEN_1=3";
export const bloknotRostovPath = "https://bloknot-rostov.ru/";

export const noimagePath = "./src/assets/noimage.jpg";
export const noimageStopPath = "./src/assets/noimagestop.jpg";
export const pointerPath = "./src/assets/pointer.jpg";
export const rssLogoPath = "./src/assets/rss-logo.png";
export const arrowLeftPath = "./src/assets/arrow-left.png";
export const archiveLogoPath = "./src/assets/archive.png";

const routes = {
  mailPath: () => [proxyPath, mail61Path].join(""),
  rbcPath: () => [proxyPath, rbcRussiaPath].join(""),
  bloknotPath: () => [proxyPath, bloknotRostovPath].join(""),
  bloknotSecondPagePath: () => [proxyPath, bloknotRostovSecondPagePath].join(""),
  bloknotThirdPagePath: () => [proxyPath, bloknotRostovThirdPagePath].join(""),
  linkPath: (link) => [proxyPath, link].join(""),
};

export const urls = [
  routes.rbcPath(),
  routes.mailPath(),
  routes.bloknotPath(),
  routes.bloknotSecondPagePath(),
  routes.bloknotThirdPagePath(),
];

export default routes;
