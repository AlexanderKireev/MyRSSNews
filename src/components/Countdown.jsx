import React, { useEffect } from "react";

const Countdown = ({ seconds, setSeconds }) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, "1000");
    return () => clearTimeout(timerId);
  }, [seconds]);

  if (seconds > 20) {
    return null;
  }

  if (seconds === 0) {
    return <>Идет сбор новостей. Ожидайте...</>;
  }

  return <>Ождание бесплатного сервера... {seconds} сек.</>;
};

export default Countdown;
