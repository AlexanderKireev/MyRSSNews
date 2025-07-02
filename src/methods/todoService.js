import createRbcTodos, { updateRbcTodos } from "./feeds/rbcService.js";
import createMailTodos, { updateMailTodos } from "./feeds/mailService.js";
import createBloknotTodos, { updateBloknotTodos } from "./feeds/bloknotService.js";
import { boxTitles } from "../constants.js";

const createTodos = (data, setTodos, setArchiveTodos) => {
  const content = {
    firstRenderedTodos: [],
    secondRenderedTodos: [],
    // firstArchiveTodos: [],
    secondArchiveTodos: [],
    firstRbcArchive: [],
    secondRbcArchive: [],
    mailArchive: [],
  };
  createRbcTodos(data, content);
  createBloknotTodos(data, content);
  createMailTodos(data, content);
  setTodos({
    first: content.firstRenderedTodos,
    second: content.secondRenderedTodos,
  });
  setArchiveTodos({
    // first: content.firstArchiveTodos, ////
    first: [...content.firstRbcArchive, ...content.mailArchive, ...content.secondRbcArchive],
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
