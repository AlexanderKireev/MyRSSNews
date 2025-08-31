import _ from "lodash";
import { renderedTodoCount, todoRenderDelay, initialParseDelay } from "../../constants.js";
import { parsingHtml } from "../xmlParser.js";

const createBloknotTodos = (
  { bloknotXml, bloknotSecondPageXml, bloknotThirdPageXml },
  { secondRenderedTodos, secondArchiveTodos },
  isMailError,
) => {
  const firstPage = parsingHtml(bloknotXml);
  const secondPage = parsingHtml(bloknotSecondPageXml);
  const thirdPage = parsingHtml(bloknotThirdPageXml);
  const allBloknotTodos = [...firstPage, ...secondPage, ...thirdPage];
  allBloknotTodos.shift(); // for Demo-mode
  allBloknotTodos.forEach((todo, i) => {
    todo.id = _.uniqueId();
    todo.feed = "bloknot";
    todo.fetchDelay = initialParseDelay;
    switch (true) {
      // i < 8
      case i < renderedTodoCount / 2:
        todo.cn = "initial";
        todo.renderDelay = todoRenderDelay * i + "s";
        secondRenderedTodos.splice(i, 1, todo);
        break;
      // i >= 8 && i < 16 => Начало архива
      case i >= renderedTodoCount / 2 && i < renderedTodoCount:
        todo.cn = isMailError ? "initial" : "add-to-archive";
        todo.renderDelay = isMailError ? todoRenderDelay * i + "s" : "0";
        if (isMailError) {
          secondRenderedTodos.splice(i, 1, todo);
        } else {
          secondArchiveTodos.splice(i - renderedTodoCount / 2, 1, todo);
        }
        break;
      // i >= 16
      case i >= renderedTodoCount:
        todo.cn = "add-to-archive";
        if (isMailError) {
          secondArchiveTodos.splice(i - renderedTodoCount, 1, todo);
        } else {
          secondArchiveTodos.splice(i + renderedTodoCount / 2 / 2, 1, todo);
        }
        break;
    }
  });
};

export const updateBloknotTodos = ({ bloknotXml }, { secondAddedTodos, secondOldTitles }) => {
  const allBloknotTodos = parsingHtml(bloknotXml);
  allBloknotTodos.forEach((todo) => {
    if (!secondOldTitles.includes(todo.description)) {
      todo.id = _.uniqueId();
      todo.cn = "initial add";
      todo.feed = "bloknot";
      todo.fetchDelay = initialParseDelay;
      secondAddedTodos.unshift(todo);
    }
  });
};

export default createBloknotTodos;
