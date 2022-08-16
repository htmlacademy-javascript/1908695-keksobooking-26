const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        onFail();
      }
    });
};
getData();
export {getData};
