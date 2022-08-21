import {showAlert} from './utils.js';
import {mapFilters, adForm, disableForm} from './form.js';
const URL = 'https://26.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => {
  fetch(URL)
    .then((response) => response.json())
    .then((serverData) => onSuccess(serverData))
    .catch(() => {
      showAlert('данные с сервера не получены');
      disableForm(adForm);
      disableForm(mapFilters);
    });
};
export {getData};

