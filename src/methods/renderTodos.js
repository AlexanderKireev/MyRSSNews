import getRenderData from "./getRenderData.js";
import { todoAnimationDelay, boxTitles } from "../constants.js";

const renderTodoBox = (
  { addedTodos, deletedTodos, deletedTodosIdxs, dontGoToArchiveIdxs },
  todos,
  archiveTodos,
  boxNumber,
  { setTodos, setArchiveTodos, setArchLogoCn, setIsAutoUpdateRun },
) => {
  let dontGoToArchiveIdxsLength = dontGoToArchiveIdxs.length;
  setArchLogoCn((prevState) => ({ ...prevState, [boxNumber]: "archive-logo run" }));
  addedTodos.forEach((newTodo, i) => {
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
      archiveTodos[boxNumber][15 - i].cn = "hide-from-archive";
    }
  });
  setArchiveTodos(archiveTodos);
  setTimeout(() => {
    addedTodos.forEach((newTodo, i) => {
      const [delTodo] = todos[boxNumber].splice(deletedTodosIdxs[i], 1);
      delTodo.cn = "add-to-archive";
      if (!dontGoToArchiveIdxs.includes(deletedTodosIdxs[i])) {
        deletedTodos.push(delTodo);
      }
      newTodo.cn = "initial";
      todos[boxNumber].unshift(newTodo);
    });

    setArchLogoCn((prevState) => ({ ...prevState, [boxNumber]: "archive-logo" }));
    // setTodos((prevState) => ({ ...prevState, [boxNumber]: [...prevState[boxNumber]] }));
    setTodos({ ...todos, [boxNumber]: [...todos[boxNumber]] });
    setArchiveTodos((prevState) => ({
      ...prevState,
      [boxNumber]: [...deletedTodos, ...prevState[boxNumber]],
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
