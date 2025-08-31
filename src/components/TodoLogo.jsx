import React, { useState, useContext, useMemo, useEffect } from "react";
import DataContext from "../contexts/dataContext.js";
import { wrapPromise, fetcher } from "../methods/getFetchData.js";
import getArticleContent from "../methods/getArticleContent.js";
import { previewTransitionDuration } from "../constants.js";
import routes from "../routes.js";

const TodoLogo = ({ todo }) => {
  const {
    imgLinks,
    setBoxesCn,
    scrollToTop,
    setCurrentId,
    setFullText,
    setImgLinks,
    setPreviewContentCn,
    setZIndex,
    setVisitedIds,
  } = useContext(DataContext);

  const [resource, setResource] = useState(null);
  const [data, setData] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (todo.feed !== "rbc" && !imgLinks[todo.id]) {
      const _resource = wrapPromise(fetcher(routes.linkPath(todo.link), todo.fetchDelay));
      setResource(_resource);
    }
  }, []);

  if (!imgSrc && imgLinks[todo.id]) {
    setImgSrc(imgLinks[todo.id]);
  } else {
    const promiseResolveResponse = todo.feed !== "rbc" ? resource?.read() : "Lorem insup";
    if (data !== promiseResolveResponse) {
      setData(promiseResolveResponse);
    }
  }

  useEffect(() => {
    if (data) {
      const { resultImgLink, articleContent } = getArticleContent(todo, data);
      setImgSrc(resultImgLink);
      setImgLinks((prevState) => ({ ...prevState, [todo.id]: resultImgLink }));
      setFullText((prevState) => ({ ...prevState, [todo.id]: articleContent }));
    }
  }, [data]);

  const memoizedTodoLogo = useMemo(() => {
    const changeTodo = () => {
      if (!history.state && screen.orientation.type === "portrait-primary") {
        window.history.pushState({ handleState: true }, null, "./");
        setBoxesCn("boxes no-scroll");
      }
      setZIndex(1);
      setVisitedIds((prevState) => [todo.id, ...prevState]);
      setCurrentId(todo.id);
      scrollToTop();
      setPreviewContentCn("menu-content show");
      setTimeout(() => {
        setPreviewContentCn("menu-content"); // надо переименовать в preview-content
      }, previewTransitionDuration);
    };

    return (
      <div className="todo-logo img-include">
        <img
          alt="img"
          className="logo"
          onClick={changeTodo}
          src={imgSrc}
          // loading="lazy"
        />
      </div>
    );
  }, [imgSrc]);

  return <>{memoizedTodoLogo}</>;
};

export default TodoLogo;
