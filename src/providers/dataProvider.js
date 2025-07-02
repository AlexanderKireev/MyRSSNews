import React, { useState, useRef } from "react";
import DataContext from "../contexts/dataContext.js";

const initState = { first: [], second: [] };

const DataProvider = ({ children }) => {
  const [archiveTodos, setArchiveTodos] = useState(initState);
  const [currentId, setCurrentId] = useState(null);
  const [fullText, setFullText] = useState({}); // { id: <fullText1>, ... }
  const [previewContentCn, setPreviewContentCn] = useState("menu-content");
  const [imgLinks, setImgLinks] = useState({}); // { id: <imgLink1>, ... }
  const [todos, setTodos] = useState(initState); // 16 todos in every array
  const [visitedIds, setVisitedIds] = useState([]);
  const [zIndex, setZIndex] = useState(-1);
  const [boxesCn, setBoxesCn] = useState("boxes");

  const previewRef = useRef(null);

  const scrollToTop = () => {
    if (previewRef.current) {
      previewRef.current.scrollTo(0, 0);
    }
  };

  return (
    <DataContext.Provider
      value={{
        archiveTodos,
        setArchiveTodos,
        boxesCn,
        setBoxesCn,
        currentId,
        setCurrentId,
        fullText,
        setFullText,
        imgLinks,
        setImgLinks,
        previewContentCn,
        setPreviewContentCn,
        previewRef,
        scrollToTop,
        todos,
        setTodos,
        visitedIds,
        setVisitedIds,
        zIndex,
        setZIndex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
