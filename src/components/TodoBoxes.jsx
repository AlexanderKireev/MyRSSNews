import React, { useState, useContext, useMemo } from "react";
import DataContext from "../contexts/dataContext.js";
import usePopState from "../hooks/usePopState.js";
import useRequestData from "../hooks/useRequestData.js";
import TodoBox from "./TodoBox.jsx";
import { boxTitles } from "../constants.js";

const TodoBoxes = () => {
  const [archLogoCn, setArchLogoCn] = useState({ first: "archive-logo", second: "archive-logo" });

  const { todos, archiveTodos, boxesCn } = useContext(DataContext);

  usePopState();
  useRequestData(setArchLogoCn);

  const memoizedTodoBoxes = useMemo(() => {
    console.log("todoboxeS rerendered"); // не забыть удалить
    return (
      <div className={boxesCn}>
        {Object.entries(boxTitles).map(([boxNumber, title], i) => (
          <TodoBox
            archLogoCn={archLogoCn[boxNumber]}
            boxTitle={title}
            key={i}
            todos={todos[boxNumber]}
            archiveTodos={archiveTodos[boxNumber]}
          />
        ))}
      </div>
    );
  }, [todos, boxesCn]);

  return <>{memoizedTodoBoxes}</>;
};

export default TodoBoxes;
