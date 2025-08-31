import React, { useRef, useMemo, useState, useEffect } from "react";
import useSize from "../hooks/useSize.js";
import Spinner from "./Spinner.jsx";
import Todo from "./Todo.jsx";
import { arrowLeftPath, archiveLogoPath } from "../routes.js";

const archiveTitle = "Архив";
const archiveTitleBack = "К новостям";

const TodoBox = ({ archLogoCn, boxTitle, todos, archiveTodos }) => {
  const target = useRef(null);
  const size = useSize(target);
  const [isArchiveOn, setIsArchiveOn] = useState(false);
  const [renderedTodos, setRenderedTodos] = useState([]);
  // ширина анимации полета элемента в архив: текущий размер блока box/2 минус отступ справа 30px
  const removeWidth = size / 2 - "30" * 1 + "px";

  useEffect(() => {
    if (isArchiveOn) {
      setRenderedTodos(archiveTodos.filter((_todo, i) => i < 16));
    }
  }, [todos, isArchiveOn]);

  const memoizedTodoBox = useMemo(() => {
    if (isArchiveOn) {
      return (
        <div className="box archive-box" ref={target}>
          <header>
            <span className="box-title">{boxTitle}</span>
            <ul className="archive" onClick={() => setIsArchiveOn(false)}>
              <li className="archive-title">{archiveTitleBack}</li>
              <li>
                <img className="archive-logo-arrow" src={arrowLeftPath} alt="img" />
              </li>
            </ul>
          </header>
          {todos.length === 0 ? (
            <div className="countdown">
              <Spinner cn="box-spinner" size="40" />
            </div>
          ) : null}
          <ul className="todo-list">
            {renderedTodos.map((todo) => (
              <li
                className={todo.cn}
                key={todo.id}
                style={{
                  // ["--remove-hight"]: todo.removeHight,
                  // ["--remove-width"]: removeWidth,
                  ["--render-delay"]: todo.renderDelay ?? "0",
                }}
              >
                <Todo todo={todo} />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="box" ref={target}>
        <header>
          <span className="box-title">{boxTitle}</span>
          <ul className="archive" onClick={() => setIsArchiveOn(true)}>
            <li className="archive-title">{archiveTitle}</li>
            <li>
              <img className={archLogoCn} src={archiveLogoPath} alt="img" />
            </li>
          </ul>
        </header>
        {todos.length === 0 ? (
          <div className="countdown">
            <Spinner cn="box-spinner" size="40" />
          </div>
        ) : null}
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              className={todo.cn}
              key={todo.id}
              style={{
                ["--remove-hight"]: todo.removeHight,
                ["--remove-width"]: removeWidth,
                ["--render-delay"]: todo.renderDelay ?? "0",
              }}
            >
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }, [todos, renderedTodos, isArchiveOn]);

  return <>{memoizedTodoBox}</>;
};

export default TodoBox;
