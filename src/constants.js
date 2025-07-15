export const boxTitles = { first: "Россия", second: "Ростов-на-Дону" };
export const contentUpdateInterval = 20000;
export const firstUpdateDelay = 27000;
// export const firstUpdateDelay = 5000;
export const todoRenderDelay = 0.06; // 60ms
export const initialParseDelay = 2000;
export const blockParseDelay = 7000;
export const parsedBlockLength = 6;
export const todoAnimationDelay = 7000;
export const renderedTodoCount = 16; // 16 todos
export const mailTodoCount = 40;
export const rbcTodoCount = 30;
export const bloknotTodoCount = 20;
export const previewTransitionDuration = 350;
// export const bloknotFetchCount = 6;

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
    // .replaceAll(/<.*?>/g, "")
    .replaceAll(/\s{2,}/g, "");
// .replaceAll(/{.*?}/g, "");

// export const fetchDelay = {
//   0: "2000",
//   1: "2000",
//   2: "2000",
//   3: "9000",
//   4: "9000",
//   5: "9000",
//   6: "16000",
//   7: "16000",
//   8: "2000",
//   9: "2000",
//   10: "2000",
//   11: "9000",
//   12: "9000",
//   13: "9000",
//   14: "16000",
//   15: "16000",
//   16: "16000",
//   17: "33000",
//   18: "33000",
//   19: "33000",
//   20: "2000",
//   21: "2000",
//   22: "2000",
//   23: "9000",
//   24: "9000",
//   25: "9000",
//   26: "16000",
//   27: "16000",
//   28: "2000",
//   29: "2000",
//   30: "2000",
//   31: "9000",
//   32: "9000",
//   33: "9000",
//   34: "16000",
//   35: "16000",
//   36: "16000",
//   37: "33000",
//   38: "33000",
//   39: "33000",
// };

// export const fetchDelay = {
//   0: "2000",
//   1: "2000",
//   2: "2000",
//   3: "8000",
//   4: "8000",
//   5: "8000",
//   6: "14000",
//   7: "14000",
//   8: "14000",
//   9: "20000",
//   10: "20000",
//   11: "20000",
//   12: "26000",
//   13: "26000",
//   14: "26000",
//   15: "32000",
//   16: "32000",
//   17: "32000",
//   18: "38000",
//   19: "38000",
//   20: "2000",
//   21: "2000",
//   22: "2000",
//   23: "8000",
//   24: "8000",
//   25: "8000",
//   26: "14000",
//   27: "14000",
//   28: "14000",
//   29: "20000",
//   30: "20000",
//   31: "20000",
//   32: "26000",
//   33: "26000",
//   34: "26000",
//   35: "32000",
//   36: "32000",
//   37: "32000",
//   38: "38000",
//   39: "38000",
// };

const todoOrder = [
  "20",
  "0",
  "21",
  "1",
  "22",
  "2",
  "23",
  "3",
  "24",
  "4",
  "25",
  "5",
  "26",
  "6",
  "27",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "28",
  "16",
  "29",
  "17",
  "30",
  "18",
  "31",
  "19",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
];

export default todoOrder;
