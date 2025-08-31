import _ from "lodash";
import { renderedTodoCount, todoRenderDelay } from "../../constants.js";
import parsingUrl from "../xmlParser.js";

const createRbcTodos = ({ rbcXml }, { firstRenderedTodos, firstArchiveTodos }, isMailError) => {
  const allTodos = parsingUrl(rbcXml).posts;
  const  newTodos = allTodos.filter((todo) => todo.fullText);
  const  deletedTodos = allTodos.filter((todo) => !todo.fullText);
  const allRbcTodos = [...newTodos, ...deletedTodos];
  allRbcTodos.shift(); // for Demo-mode
  allRbcTodos.shift(); // for Demo-mode
  allRbcTodos.forEach((todo, i) => {
    const uniqId = _.uniqueId();
    todo.id = uniqId;
    todo.feed = "rbc";
    switch (true) {
      // i < 8
      case i < renderedTodoCount / 2:
        todo.cn = "initial";
        todo.renderDelay = todoRenderDelay * i + "s";
        firstRenderedTodos.splice(i, 1, todo);
        break;
      // i >= 8 && i < 16 => Начало архива
      case i >= renderedTodoCount / 2 && i < renderedTodoCount:
        todo.cn = isMailError ? "initial" : "add-to-archive";
        todo.renderDelay = isMailError ? todoRenderDelay * i + "s" : "0";
        if (isMailError) {
          firstRenderedTodos.splice(i, 1, todo);
        } else {
          firstArchiveTodos.splice(i - renderedTodoCount / 2, 1, todo);
        }
        break;
      // i >= 16
      case i >= renderedTodoCount:
        todo.cn = "add-to-archive";
        if (isMailError) {
          firstArchiveTodos.splice(i - renderedTodoCount, 1, todo);
        } else {
          firstArchiveTodos.splice(i + renderedTodoCount / 2 / 2, 1, todo);
        }
        break;
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
