import { renderedTodoCount } from "../constants";

const maxRandomTodosNumber = 5;

const getRandDelIndxs = (length) => {
  const result = [];
  if (length >= maxRandomTodosNumber) {
    for (let i = 0; i < length; i++) {
      result.push(i + renderedTodoCount - length);
    }
    return result;
  }
  const min = renderedTodoCount - maxRandomTodosNumber;
  const max = renderedTodoCount;
  for (let i = 0; i < length; i++) {
    let rand = Math.floor(min + Math.random() * (max - min));
    while (result.includes(rand)) {
      rand = Math.floor(min + Math.random() * (max - min));
    }
    result.push(rand);
  }
  result.sort((a, b) => a - b);
  return result;
};

const getRenderData = (newTodos, oldTodos, fullText) => {
  const renderedNewTodos = [];
  const deletedTodos = [];
  const selfUpdatedNewsIdxs = [];
  const selfDeletedNewsIdxs = [];
  const delIdxs = [];
  if (newTodos.length > renderedTodoCount) {
    newTodos.reverse().forEach((todo, i) => {
      if (i < renderedTodoCount / 2 / 2) {
        renderedNewTodos.unshift(todo);
      } else {
        let newTodo = oldTodos.find((item) => item.title === todo.title);
        if (!newTodo) {
          newTodo = oldTodos.find((item) => item.description === todo.description);
        }
        if (!newTodo || todo.feed !== newTodo.feed) {
          todo.cn = "add-to-archive";
          deletedTodos.push(todo);
        }
      }
    });
  } else {
    newTodos.forEach((todo) => renderedNewTodos.push(todo));
  }
  oldTodos.forEach((todo, i) => {
    let newTodo = renderedNewTodos.find((item) => item.title === todo.title);
    if (!newTodo) {
      newTodo = renderedNewTodos.find((item) => item.description === todo.description);
    }
    if (newTodo && todo.feed === newTodo.feed) {
      selfUpdatedNewsIdxs.push(i);
    }
    if (fullText[todo.id] && fullText[todo.id][2]?.props?.children === "Новость удалена.") {
      selfDeletedNewsIdxs.push(i);
    }
  });
  if (renderedNewTodos.length > 0) {
    const randDelIdxs = getRandDelIndxs(renderedNewTodos.length);
    const concatedArray = [...selfUpdatedNewsIdxs, ...selfDeletedNewsIdxs, ...randDelIdxs];
    const uniqueArray = concatedArray.filter((value, i) => concatedArray.indexOf(value) === i);
    randDelIdxs.forEach((_value, i) => delIdxs.push(uniqueArray[i]));
    delIdxs.sort((a, b) => a - b);
    return {
      addedTodos: renderedNewTodos,
      deletedTodos,
      deletedTodosIdxs: delIdxs,
      selfUpdatedNewsIdxs,
      selfDeletedNewsIdxs,
    };
  } else {
    return null;
  }
};

export default getRenderData;
