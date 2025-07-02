const proxyPath = "http://localhost:3001/?";
const mail61Path = "https://news.mail.ru/rss/main/61/";
const rbcRussiaPath = "http://static.feed.rbc.ru/rbc/logical/footer/news.rss";
// const bloknotRostovPath = "https://bloknot-rostov.ru/rss_news.php";
export const bloknotRostovPath = "https://bloknot-rostov.ru/";
const bloknotRostovSecondPagePath = "https://bloknot-rostov.ru/?PAGEN_1=2";

const routes = {
  mailPath: () => [proxyPath, mail61Path].join(""),
  rbcPath: () => [proxyPath, rbcRussiaPath].join(""),
  bloknotPath: () => [proxyPath, bloknotRostovPath].join(""),
  bloknotSecondPagePath: () => [proxyPath, bloknotRostovSecondPagePath].join(""),
  linkPath: (link) => [proxyPath, link].join(""),
};

export const urls = [
  routes.rbcPath(),
  routes.mailPath(),
  routes.bloknotPath(),
  routes.bloknotSecondPagePath(),
];

export default routes;
