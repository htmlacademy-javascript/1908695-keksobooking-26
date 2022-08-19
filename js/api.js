const URL = 'https://26.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess, onFail) => {
  fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    });
};
getData();
export {getData};
