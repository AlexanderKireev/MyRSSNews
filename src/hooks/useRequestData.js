import { useState, useEffect, useContext } from "react";
import DataContext from "../contexts/dataContext.js";
import getFetchData from "../methods/getFetchData.js";
import { urls } from "../routes.js";
import createTodos, { updateTodos } from "../methods/todoService.js";
import renderTodos from "../methods/renderTodos.js";
import { firstUpdateDelay, contentUpdateInterval } from "../constants.js";

const useRequestData = (setArchLogoCn) => {
  const [newsChangeCounter, setNewsChangeCounter] = useState(0);
  const [isAutoUpdateRun, setIsAutoUpdateRun] = useState(false);
  const [fetchData, setFetchData] = useState({}); // { 'rbc': <fetchData>, 'mail': <fetchData>, .. }

  const { todos, setTodos, archiveTodos, setArchiveTodos, fullText } = useContext(DataContext);

  useEffect(() => {
    const requestData = async () => {
      const [rbcXml, mailXml, bloknotXml, bloknotSecondPageXml, bloknotThirdPageXml] =
        await getFetchData(urls);
      setFetchData({ rbc: rbcXml + " ", mail: mailXml, bloknot: bloknotXml + " " });
      const data = { rbcXml, mailXml, bloknotXml, bloknotSecondPageXml, bloknotThirdPageXml };
      createTodos(data, setTodos, setArchiveTodos);
      setTimeout(() => {
        console.warn("run autoUpdate"); // не забыть удалить
        setIsAutoUpdateRun(true);
      }, firstUpdateDelay);
    };
    requestData();
  }, []);

  useEffect(() => {
    const autoUpdate = async () => {
      let changeCounter = 0;
      const [rbc, mail, bloknot] = await getFetchData(urls);
      const feedXmls = { rbc, mail, bloknot };
      Object.entries(feedXmls).forEach(([key, value]) => {
        if (fetchData[key] !== value) {
          console.log(`${key} Изменились!`); // не забыть удалить
          setFetchData({ ...fetchData, [key]: value });
          changeCounter += 1;
        }
      });
      if (changeCounter > 0) {
        setIsAutoUpdateRun(false);
        setNewsChangeCounter(changeCounter);
      } else {
        setTimeout(() => autoUpdate(), contentUpdateInterval);
      }
    };
    if (isAutoUpdateRun) {
      autoUpdate();
    }
  }, [isAutoUpdateRun]);

  useEffect(() => {
    if (newsChangeCounter > 0) {
      setNewsChangeCounter(0);
      const data = {
        rbcXml: fetchData.rbc,
        mailXml: fetchData.mail,
        bloknotXml: fetchData.bloknot,
      };
      const newTodos = updateTodos(data, todos, archiveTodos);
      if (!newTodos) {
        setIsAutoUpdateRun(true);
      } else {
        const methods = { setTodos, setArchiveTodos, setArchLogoCn, setIsAutoUpdateRun };
        renderTodos(newTodos, todos, archiveTodos, methods, fullText);
      }
    }
  }, [newsChangeCounter]);
};

export default useRequestData;
