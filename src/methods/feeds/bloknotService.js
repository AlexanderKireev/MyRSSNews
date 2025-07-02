import _ from "lodash";
import { renderedTodoCount, todoRenderDelay, initialParseDelay } from "../../constants.js";
import { parsingHtml } from "../xmlParser.js";

const createBloknotTodos = (
  { bloknotXml, bloknotSecondPageXml },
  { secondRenderedTodos, secondArchiveTodos },
) => {
  const bloknotTodos = [];
  const firstPage = parsingHtml(bloknotXml);
  const secondPage = parsingHtml(bloknotSecondPageXml);
  const allBloknotTodos = [...firstPage, ...secondPage];
  allBloknotTodos.shift(); // for Demo-mode
  allBloknotTodos.forEach((todo, i) => {
    // todo.description = todo.description.replaceAll(/<.*?>/g, "").replaceAll(/{.*?}/g, "");
    todo.id = _.uniqueId();
    todo.feed = "bloknot";
    todo.fetchDelay = initialParseDelay;
    bloknotTodos.push(todo);
    // i < 8
    if (i < renderedTodoCount / 2) {
      todo.cn = "initial";
      todo.renderDelay = todoRenderDelay * i + "s";
      secondRenderedTodos.push(todo);
    } else {
      todo.cn = "add-to-archive";
      secondArchiveTodos.push(todo);
    }
  });
};

export const updateBloknotTodos = ({ bloknotXml }, { secondAddedTodos, secondOldTitles }) => {
  const allBloknotTodos = parsingHtml(bloknotXml);
  allBloknotTodos.forEach((todo) => {
    // todo.description = todo.description.replaceAll(/<.*?>/g, "").replaceAll(/{.*?}/g, "");
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
