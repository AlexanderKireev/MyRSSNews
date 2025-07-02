import _ from "lodash";
import { renderedTodoCount, todoRenderDelay } from "../../constants.js";
import parsingUrl from "../xmlParser.js";

const createRbcTodos = ({ rbcXml }, { firstRenderedTodos, firstRbcArchive, secondRbcArchive }) => {
  const allRbcTodos = parsingUrl(rbcXml).posts;
  allRbcTodos.shift(); // for Demo-mode
  allRbcTodos.shift(); // for Demo-mode
  allRbcTodos.forEach((todo, i) => {
    const uniqId = _.uniqueId();
    todo.id = uniqId;
    // todo.cn = "initial";
    todo.feed = "rbc";
    // i < 8
    if (i < renderedTodoCount / 2) {
      todo.cn = "initial";
      todo.renderDelay = todoRenderDelay * i + "s";
      firstRenderedTodos.push(todo);
    } else if (i >= renderedTodoCount / 2 && i < renderedTodoCount) {
      todo.cn = "add-to-archive";
      // firstArchiveTodos.push(todo);
      firstRbcArchive.push(todo);
    } else {
      todo.cn = "add-to-archive";
      // firstArchiveTodos.push(todo);
      secondRbcArchive.push(todo);
    }
  });
};

export const updateRbcTodos = ({ rbcXml }, { firstAddedTodos, firstOldTitles }) => {
  const allRbcTodos = parsingUrl(rbcXml).posts;
  allRbcTodos.forEach((todo) => {
    const newText = todo.fullText ? todo.fullText : todo.description;
    if (!firstOldTitles.includes(newText)) {
      const uniqId = _.uniqueId();
      todo.id = uniqId;
      todo.cn = "initial add";
      todo.feed = "rbc";
      firstAddedTodos.unshift(todo);
    }
  });
};

export default createRbcTodos;
