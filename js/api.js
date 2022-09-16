import {showAlert} from './utils.js';
import {makeFormsDisabled} from './form.js';

const URL_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://26.javascript.pages.academy/keksobooking/';

const getData = (onSuccess) => {
  fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Данные с сервера не получены, обновите страницу');
    })
    .then((serverData) => onSuccess(serverData))
    .catch((err) => {
      showAlert(err);
      makeFormsDisabled();
    });
};


const sendData = (onSuccess, onError, body) => {
  fetch(URL_SEND,
    {
      method: 'POST',
      body,
    }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch((error) => onError(error));
};

export {getData, sendData};
