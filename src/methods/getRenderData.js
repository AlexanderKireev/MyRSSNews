import { renderedTodoCount } from "../constants";

const getRandDelIndxs = (length) => {
  const result = [];
  if (length === renderedTodoCount - 1) {
    for (let i = 1; i <= length; i++) {
      result.push(i);
    }
    return result;
  }
  if (length === renderedTodoCount - 2) {
    for (let i = 1; i <= length; i++) {
      result.push(i + 1);
    }
    return result;
  }
  if (length > renderedTodoCount - 1) {
    for (let i = 0; i < renderedTodoCount; i++) {
      result.push(i);
    }
    return result;
  }
  const min = 2;
  const max = renderedTodoCount - 1;
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(min + Math.random() * (max + 1 - min));
    while (result.includes(rand)) {
      rand = Math.floor(min + Math.random() * (max + 1 - min));
    }
    result.push(rand);
  }
  result.sort((a, b) => a - b);
  return result;
};

const getRenderData = (newTodos, oldTodos, fullText) => {
  const deletedTodos = [];
  const selfUpdatedNewsIdxs = [];
  if (newTodos.length > renderedTodoCount) {
    const renderedTodos = [];
    const delIdxs = getRandDelIndxs(newTodos.length);
    newTodos.reverse().forEach((todo, i) => {
      if (i < renderedTodoCount) {
        renderedTodos.unshift(todo);
      } else {
        todo.cn = "add-to-archive";
        deletedTodos.push(todo);
      }
    });
    return {
      addedTodos: renderedTodos,
      deletedTodos,
      deletedTodosIdxs: delIdxs,
      dontGoToArchiveIdxs: selfUpdatedNewsIdxs,
    };
  }
  const delIdxs = [];
  const selfDeletedNewsIdxs = [];
  const newTodoTitles = newTodos.map((todo) => todo.title);
  const newTodoDescriptions = newTodos.map((todo) => todo.description);
  console.log(newTodoTitles); // не забыть удалить
  oldTodos.forEach((todo, i) => {
    if (newTodoTitles.includes(todo.title) || newTodoDescriptions.includes(todo.description)) {
      selfUpdatedNewsIdxs.push(i);
    }
    if (fullText[todo.id] && fullText[todo.id][2]?.props?.children === "Новость удалена.") {
      console.log('Новость удалена!!!'); // не забыть удалить
      selfDeletedNewsIdxs.push(i);
    }
  });
  if (newTodos.length > 0 && newTodos.length <= renderedTodoCount) {
    const randDelIdxs = getRandDelIndxs(newTodos.length);
    const concatedArray = [...selfUpdatedNewsIdxs, ...selfDeletedNewsIdxs, ...randDelIdxs];
    const uniqueArray = concatedArray.filter((value, i) => concatedArray.indexOf(value) === i);
    randDelIdxs.forEach((_value, i) => delIdxs.push(uniqueArray[i]));
    delIdxs.sort((a, b) => a - b);
    return {
      addedTodos: newTodos,
      deletedTodos,
      deletedTodosIdxs: delIdxs,
      dontGoToArchiveIdxs: selfUpdatedNewsIdxs,
    };
  } else {
    return null;
  }
};

export default getRenderData;
