import React, { useContext, useMemo } from "react";
import DataContext from "../contexts/dataContext";

const text = "Нажми на картинку любой новости";

function PreviewBox() {
  const {
    // todos,
    // archiveTodos,
    currentId,
    imgLinks,
    fullText,
    previewContentCn,
    previewRef,
    // setZIndex,
    zIndex,
  } = useContext(DataContext);

  const memoizedPreviewBox = useMemo(() => {
    console.log("preview rerendered"); // Не забыть удалить

    const closePreview = () => {
      // setZIndex(-1);
      window.history.back();
    };

    // const printTodo = () => {
    //   console.warn(todos);
    //   console.warn(archiveTodos);
    // }

    if (zIndex === -1 && screen.orientation.type === "portrait-primary") {
      return null;
    }

    return (
      <div
        className="menu"
        style={{
          ["--z-index-value"]: zIndex,
        }}
      >
        <header>
          <div className="menu-title">
            <img className="rss-logo" src="./rss-logo.png" alt="img" />
            <span className="rss-title">RSS Новости</span>
          </div>
          <a href="#">
            <span className="close-button" onClick={closePreview}>
              &#10005;
            </span>
          </a>
        </header>

        <div className={previewContentCn} ref={previewRef}>
          {/* <input type="submit" value="TodoList" onClick={printTodo} /> */}
          {imgLinks[currentId] === "./noimage.jpg" || !imgLinks[currentId] ? null : (
            <img className="menu-todo-logo" src={imgLinks[currentId]} alt="img" />
          )}
          {currentId ? (
            fullText[currentId]
          ) : (
            <div className="push">
              <img className="pointer" src="./pointer.jpg" alt="pointer" />
              <h2>{text}</h2>
            </div>
          )}
        </div>
      </div>
    );
  }, [currentId, previewContentCn, zIndex]);

  return <>{memoizedPreviewBox}</>;
}

export default PreviewBox;
