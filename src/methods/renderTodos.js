import getRenderData from "./getRenderData.js";
import boxTitles, { todoAnimationDelay } from "../constants.js";

const renderTodoBox = (
  { addedTodos, deletedTodos, deletedTodosIdxs, selfUpdatedNewsIdxs, selfDeletedNewsIdxs },
  todos,
  archiveTodos,
  boxNumber,
  { setTodos, setArchiveTodos, setArchLogoCn, setIsAutoUpdateRun },
) => {
  let dontGoToArchiveIdxsLength = selfUpdatedNewsIdxs.length + selfDeletedNewsIdxs.length;
  const addedToArchiveTodos = [];
  setArchLogoCn((prevState) => ({ ...prevState, [boxNumber]: "archive-logo run" }));

  if (
    archiveTodos[boxNumber].length > 16 &&
    archiveTodos[boxNumber][archiveTodos[boxNumber].length - 1]?.cn !== "hide-from-archive"
  ) {
    for (let x = archiveTodos[boxNumber].length - 1; x >= 16; x -= 1) {
      archiveTodos[boxNumber][x].cn = "hide-from-archive";
    }
  }

  addedTodos.forEach((newTodo, i) => {
    // мутация todos, подумать как исправить
    todos[boxNumber][deletedTodosIdxs[i]].cn = "hide";
    // высота анимации полета элемента: высоту элемента <li> {hight: 56px} умножаем на его
    // порядковый номер (текущий индекс + 1), добавляем нижний отступ <header> {margin-bottom:5px}
    // и умножаем на -1, т.к. летим вверх
    todos[boxNumber][deletedTodosIdxs[i]].removeHight =
      "56" * (deletedTodosIdxs[i] + 1) * -1 + "px";
    setTodos((prevState) => ({ ...prevState, [boxNumber]: [newTodo, ...prevState[boxNumber]] }));
    if (dontGoToArchiveIdxsLength > 0) {
      dontGoToArchiveIdxsLength -= 1;
    } else {
      if (
        archiveTodos[boxNumber][0]?.cn !== "hide-from-archive" &&
        archiveTodos[boxNumber].length >= 16
      ) {
        for (let j = archiveTodos[boxNumber].length - 1; j >= 0; j -= 1) {
          while (archiveTodos[boxNumber][j].cn === "hide-from-archive") {
            j -= 1;
          }
          archiveTodos[boxNumber][j].cn = "hide-from-archive";
          j = -1;
        }
      }
    }
  });
  setArchiveTodos(archiveTodos);
  setTimeout(() => {
    addedTodos.forEach((newTodo, i) => {
      const [delTodo] = todos[boxNumber].splice(deletedTodosIdxs[i], 1);
      delTodo.cn = "add-to-archive";
      if (!selfUpdatedNewsIdxs.includes(deletedTodosIdxs[i])) {
        if (selfDeletedNewsIdxs.includes(deletedTodosIdxs[i])) {
          deletedTodos.push(delTodo);
        } else {
          addedToArchiveTodos.push(delTodo);
        }
      }
      newTodo.cn = "initial";
      todos[boxNumber].unshift(newTodo);
    });

    setArchLogoCn((prevState) => ({ ...prevState, [boxNumber]: "archive-logo" }));
    // setTodos((prevState) => ({ ...prevState, [boxNumber]: [...prevState[boxNumber]] }));
    setTodos({ ...todos, [boxNumber]: [...todos[boxNumber]] });
    setArchiveTodos((prevState) => ({
      ...prevState,
      [boxNumber]: [...addedToArchiveTodos, ...prevState[boxNumber], ...deletedTodos],
    }));
    console.log("Новость обновлена, пора запускать autoUpdate"); // не забыть удалить
    setIsAutoUpdateRun(true);
  }, todoAnimationDelay);
};

const renderTodos = (newTodos, todos, archiveTodos, methods, fullText) => {
  Object.keys(boxTitles).forEach((boxNumber) => {
    const result = getRenderData(newTodos[boxNumber], todos[boxNumber], fullText);
    if (result) {
      renderTodoBox(result, todos, archiveTodos, boxNumber, methods);
    }
  });
};

export default renderTodos;
