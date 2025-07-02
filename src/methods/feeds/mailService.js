import _ from "lodash";
import parsingUrl from "../xmlParser.js";
import todoOrder, {
  renderedTodoCount,
  mailTodoCount,
  todoRenderDelay,
  // fetchDelay,
  parsedBlockLength,
  initialParseDelay,
  blockParseDelay,
} from "../../constants.js";

const getFetchDelays = (todosLength, firstKey) => {
  const fetchDelays = {}; // { 0: "2000", 2: "2000", ..., 4: "9000", 5: "9000" }
  let parseDelay = initialParseDelay;
  for (let i = 0; i < todosLength; i += 1) {
    if (i !== 0 && i % (parsedBlockLength / 2) === 0) {
      parseDelay += blockParseDelay;
    }
    fetchDelays[i + firstKey] = parseDelay;
    fetchDelays[i + firstKey + 20] = parseDelay;
  }
  return fetchDelays;
};

const createMailTodos = (
  { mailXml },
  { firstRenderedTodos, secondRenderedTodos, secondArchiveTodos, mailArchive },
) => {
  const mailTodos = [];
  const allMailTodos = parsingUrl(mailXml).posts;
  const renderedDelays = getFetchDelays(renderedTodoCount / 2, 0);
  const archivedDelays = getFetchDelays(
    mailTodoCount / 2 - renderedTodoCount / 2,
    renderedTodoCount / 2,
  );
  const fetchDelays = { ...renderedDelays, ...archivedDelays };
  allMailTodos.forEach((todo, i) => {
    todo.id = _.uniqueId();
    // todo.cn = "initial";
    todo.feed = "mail";
    todo.fetchDelay = fetchDelays[i];
    mailTodos.push(todo);
    switch (true) {
      case i < renderedTodoCount / 2: // i < 8 => Ростов-на-Дону
        todo.cn = "initial";
        // 0.06 * (i + 8)
        todo.renderDelay = todoRenderDelay * (i + renderedTodoCount / 2) + "s";
        // todo.fetchDelay = fetchDelays[i];
        secondRenderedTodos.push(todo);
        break;
      // i >= 8 && i < 20 => Архив Ростова-на-Дону
      case i >= renderedTodoCount / 2 && i < mailTodoCount / 2:
        todo.cn = "add-to-archive";
        secondArchiveTodos.push(todo);
        break;
      // i >= 20 && i < 28 => Россия
      case i >= mailTodoCount / 2 && i < mailTodoCount / 2 + renderedTodoCount / 2:
        todo.cn = "initial";
        todo.renderDelay =
          todoRenderDelay * (i - (mailTodoCount / 2 - renderedTodoCount / 2)) + "s"; // (i - 12)
        firstRenderedTodos.push(todo);
        break;
      case i >= mailTodoCount / 2 + renderedTodoCount / 2: // i >= 28 => Архив Россия
        todo.cn = "add-to-archive";
        mailArchive.push(todo);
        break;
    }
  });
};

export const updateMailTodos = (
  { mailXml },
  { firstAddedTodos, secondAddedTodos, firstOldTitles, secondOldTitles },
) => {
  const allMailTodos = parsingUrl(mailXml).posts;
  let firstNewTodosCounter = 0;
  let secondNewTodosCounter = 20;
  const renderedDelays = getFetchDelays(16, 0);
  const archivedDelays = getFetchDelays(4, 16);
  const fetchDelays = { ...renderedDelays, ...archivedDelays };
  allMailTodos.forEach((todo, i) => {
    // todo.fetchDelay = fetchDelay[newTodosCounter];
    if (i < 20 && !secondOldTitles.includes(todo.description)) {
      todo.id = _.uniqueId();
      todo.cn = "initial add";
      todo.feed = "mail";
      todo.fetchDelay = fetchDelays[secondNewTodosCounter];
      secondNewTodosCounter += 1;
      secondAddedTodos.unshift(todo);
    }
    if (i >= 20 && !firstOldTitles.includes(todo.description)) {
      todo.id = _.uniqueId();
      todo.cn = "initial add";
      todo.feed = "mail";
      todo.fetchDelay = fetchDelays[firstNewTodosCounter];
      firstNewTodosCounter += 1;
      firstAddedTodos.unshift(todo);
    }
  });
};

export default createMailTodos;
