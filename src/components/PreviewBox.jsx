import React, { useContext, useMemo } from "react";
import DataContext from "../contexts/dataContext";

const title = "RSS Новости";
const text = "Нажми на картинку любой новости";

const PreviewBox = () => {
  const { currentId, imgLinks, fullText, previewContentCn, previewRef, zIndex } =
    useContext(DataContext);

  const memoizedPreviewBox = useMemo(() => {
    console.log("preview rerendered"); // не забыть удалить

    const closePreview = () => {
      window.history.back();
    };

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
            <img className="rss-logo" src="./src/assets/rss-logo.png" alt="img" />
            <span className="rss-title">{title}</span>
          </div>
          <a href="#">
            <span className="close-button" onClick={closePreview}>
              &#10005;
            </span>
          </a>
        </header>

        <div className={previewContentCn} ref={previewRef}>
          {imgLinks[currentId] === "./src/assets/noimage.jpg" || !imgLinks[currentId] ? null : (
            <img className="menu-todo-logo" src={imgLinks[currentId]} alt="img" />
          )}
          {currentId ? (
            fullText[currentId]
          ) : (
            <div className="push">
              <img className="pointer" src="./src/assets/pointer.jpg" alt="pointer" />
              <h2>{text}</h2>
            </div>
          )}
        </div>
      </div>
    );
  }, [currentId, previewContentCn, zIndex]);

  return <>{memoizedPreviewBox}</>;
};

export default PreviewBox;
