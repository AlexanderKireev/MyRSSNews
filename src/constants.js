export const boxTitles = { first: "Россия", second: "Ростов-на-Дону" };
export const contentUpdateInterval = 20000;
export const firstUpdateDelay = 27000;
export const todoRenderDelay = 0.06; // 60ms
export const initialParseDelay = 2000;
export const blockParseDelay = 1500;
export const parsedBlockLength = 2;
export const todoAnimationDelay = 8500;
export const renderedTodoCount = 16; // 16 todos
export const mailTodoCount = 40;
export const rbcTodoCount = 30;
export const bloknotTodoCount = 20;
export const previewTransitionDuration = 350;

export const correctText = (text) =>
  text
    .replace(/&laquo;/gi, "«")
    .replace(/&raquo;/gi, "»")
    .replace(/&nbsp;/gi, " ")
    .replace(/&mdash;/gi, "-")
    .replace(/&quot;/gi, '"')
    .replace(/&eacute;/gi, "é")
    .replace(/&ndash;/gi, "-")
    .replace(/&euro;/gi, "€")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/&deg;/gi, "°")
    .replace(/&iacute;/gi, "í")
    .replace(/&oacute;/gi, "ó")
    .replace(/&pound;/gi, "£")
    .replace(/&auml;/gi, "ä")
    // .replaceAll(/<.*?>/g, "")
    .replaceAll(/\s{2,}/g, "");
// .replaceAll(/{.*?}/g, "");

export default boxTitles;
