import React, { lazy, Suspense, useMemo, useContext, useState } from "react";
import cn from "classnames";
import DataContext from "../contexts/dataContext.js";
import Spinner from "./Spinner.jsx";

const TodoLogo = lazy(() => import("./TodoLogo.jsx"));

const Todo = ({ todo }) => {
  const [visited, setVisited] = useState(false);
  const { visitedIds, setVisitedIds } = useContext(DataContext);

  if (!visited && visitedIds.includes(todo.id)) {
    setVisited(true);
  }

  const memoizedTodo = useMemo(() => {
    console.log("todo rerendered"); // не забыть удалить

    const changeTodoTextClassName = () => cn({ "todo-text": true }, { visited: visited });

    return (
      <div className="todo">
        <Suspense
          fallback={
            <div className="todo-logo">
              <Spinner cn="spinner" size="20" />
            </div>
          }
        >
          <TodoLogo todo={todo} />
        </Suspense>
        <a
          className={changeTodoTextClassName()}
          href={todo.link}
          onClick={() => setVisitedIds([todo.id, ...visitedIds])}
          rel="noreferrer"
          target="_blank"
        >
          {todo.title}
          <br />
          {todo.description}
        </a>
      </div>
    );
  }, [visited]);

  return <>{memoizedTodo}</>;
};

export default Todo;
