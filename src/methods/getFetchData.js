const getFetchData = (urls) =>
  Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const firstIndex = data.indexOf("bigline");
          if (firstIndex < 0) {
            return data;
          } else {
            const lastIndex = data.indexOf("</ul>", firstIndex);
            return data.slice(firstIndex, lastIndex);
          }
        })
        .catch((error) => {
          console.warn("ошибка");
          return error;
        }),
    ),
  );

export function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (error) => {
      status = "error";
      result = error;
    },
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw suspender;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const repeatFetch = async (url) => {
  try {
    await delay(4000);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    return "Lorem insup";
  }
};

export const fetcher = async (url, fetchDelay) => {
  try {
    await delay(fetchDelay);
    const response = await fetch(url);
    const data = await response.json();
    // ловим ошибку капчи {"captchaPath":"/captcha/img/6","isRlimitedAgain":false}
    if (data.includes(`"isRlimitedAgain":false`)) {
      console.error(data); ////////////////////////
      repeatFetch(url);
    } else {
      return data;
    }
  } catch {
    console.error("repeatFetch in catch"); ////////////////////////
    repeatFetch(url);
  }
};

export default getFetchData;
