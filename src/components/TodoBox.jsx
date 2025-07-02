import React, { useRef, useMemo, useState, useEffect } from "react";
import useSize from "../hooks/useSize.js";
// import cn from "classnames";
import Spinner from "./Spinner.jsx";
import Todo from "./Todo.jsx";

const archiveTitle = "Архив";
const archiveTitleBack = "К новостям";

const TodoBox = ({ archLogoCn, boxTitle, todos, archiveTodos }) => {
  const target = useRef(null);
  // const headRef = useRef(null);
  const size = useSize(target);
  const [isArchiveOn, setIsArchiveOn] = useState(false);
  const [renderedTodos, setRenderedTodos] = useState([]);
  // ширина анимации полета элемента в архив: текущий размер блока box/2 минус отступ справа 30px
  const removeWidth = size / 2 - "30" * 1 + "px";

  useEffect(() => {
    if (isArchiveOn) {
      // const rT = archiveTodos.filter((_todo, i) => i < 16);
      setRenderedTodos(archiveTodos.filter((_todo, i) => i < 16));
    }
  }, [todos, isArchiveOn]);

  // const handleArchiveOn = () => {
  //   setIsArchiveOn(true);
  //   // scrollToRef();
  //   // headRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   // element.scrollTo(0, 100);
  // };

  const memoizedTodoBox = useMemo(() => {
    console.log("todobox rerendered"); //////////////////

    if (isArchiveOn) {
      return (
        <div className="box archive-box" ref={target}>
          <header>
            <span className="box-title">{boxTitle}</span>
            {/* <a href="#" onClick={() => setIsArchiveOn(false)}> */}
            <ul className="archive" onClick={() => setIsArchiveOn(false)}>
              <li className="archive-title">{archiveTitleBack}</li>
              <li>
                <img className="archive-logo-arrow" src="./arrow-left.png" alt="img" />
              </li>
            </ul>
            {/* </a> */}
          </header>
          {todos.length === 0 ? <Spinner cn="box-spinner" size="40" /> : null}
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
          {/* <div onClick={() => setIsArchiveOn(false)}> */}
          {/* <ul className="archive" onClick={() => setIsArchiveOn(true)}> */}
          <ul className="archive" onClick={() => setIsArchiveOn(true)}>
            <li className="archive-title">{archiveTitle}</li>
            <li>
              <img className={archLogoCn} src="./archive.png" alt="img" />
            </li>
          </ul>
          {/* </div> */}
        </header>
        {todos.length === 0 ? <Spinner cn="box-spinner" size="40" /> : null}
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
