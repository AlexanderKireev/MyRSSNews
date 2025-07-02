const getFetchData = (urls) =>
  Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const firstIndex = data.indexOf("bigline");
          if (firstIndex < 0) {
            return data;
          } else {
            const lastIndex = data.indexOf("</ul>", firstIndex);
            return data.slice(firstIndex, lastIndex);
          }
        })
        .catch((error) => error),
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
        // alert("ошибка fetch");
        throw suspender;
        // return result;
        // throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const fetcher = async (url, fetchDelay) => {
  try {
    await delay(fetchDelay);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    // alert("ошибка fetch1");
    return "Lorem insup";
    // throw error;
  }
};

export default getFetchData;
