import createRbcTodos, { updateRbcTodos } from "./feeds/rbcService.js";
import createMailTodos, { updateMailTodos } from "./feeds/mailService.js";
import createBloknotTodos, { updateBloknotTodos } from "./feeds/bloknotService.js";
import parsingUrl from "./xmlParser.js";
import boxTitles, { renderedTodoCount, mailTodoCount } from "../constants.js";

const createTodos = (data, setTodos, setArchiveTodos) => {
  const { mailXml } = data;
  const allMailTodos = parsingUrl(mailXml).posts;
  const isMailError = allMailTodos.length === 0;
  const archiveCount = isMailError
    ? mailTodoCount / 2 - renderedTodoCount / 2
    : renderedTodoCount * 2;
  const content = {
    firstRenderedTodos: new Array(renderedTodoCount),
    secondRenderedTodos: new Array(renderedTodoCount),
    firstArchiveTodos: new Array(archiveCount),
    secondArchiveTodos: new Array(archiveCount + 1),
  };
  if (!isMailError) {
    createMailTodos(content, allMailTodos);
  }
  createRbcTodos(data, content, isMailError);
  createBloknotTodos(data, content, isMailError);
  setTodos({
    first: content.firstRenderedTodos,
    second: content.secondRenderedTodos,
  });
  setArchiveTodos({
    first: content.firstArchiveTodos,
    second: content.secondArchiveTodos,
  });
};

export const updateTodos = (data, todos, archiveTodos) => {
  const oldTitles = {};
  Object.keys(boxTitles).forEach((boxNumber) => {
    oldTitles[boxNumber] = todos[boxNumber].map((todo) =>
      todo.fullText ? todo.fullText : todo.description,
    );
    archiveTodos[boxNumber].forEach((todo) =>
      oldTitles[boxNumber].push(todo.fullText ? todo.fullText : todo.description),
    );
  });
  const content = {
    firstAddedTodos: [],
    secondAddedTodos: [],
    firstOldTitles: oldTitles.first,
    secondOldTitles: oldTitles.second,
  };
  updateRbcTodos(data, content);
  updateBloknotTodos(data, content);
  updateMailTodos(data, content);
  return content.firstAddedTodos.length !== 0 || content.secondAddedTodos.length !== 0
    ? { first: content.firstAddedTodos, second: content.secondAddedTodos }
    : null;
};

export default createTodos;
