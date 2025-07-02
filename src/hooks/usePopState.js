import { useEffect, useContext } from "react";
import DataContext from "../contexts/dataContext.js";

const usePopState = () => {
  const { setBoxesCn, setZIndex } = useContext(DataContext);

  useEffect(() => {
    const handlePopState = () => {
      if (history.state) {
        setZIndex(1);
      } else {
        setZIndex(-1);
        setBoxesCn("boxes");
      }
    };
    window.addEventListener("popstate", handlePopState);
    if (history.state) {
      window.history.back();
    }
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

export default usePopState;
