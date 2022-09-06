import {sendData} from './api.js';
import {resetPhotos} from './photo-upload.js';

const MIN_PRICE_OF_HOUSING = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const ROOM_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const adFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeInputElement = adFormElement.querySelector('#type');
const priceInputElement = adFormElement.querySelector('#price');
const checkInInputElement = adFormElement.querySelector('#timein');
const checkOutInputElement = adFormElement.querySelector('#timeout');
const roomNumberInputElement = adFormElement.querySelector('#room_number');
const capacityInputElement = adFormElement.querySelector('#capacity');
const priceSliderElement = adFormElement.querySelector('.ad-form__slider');
const successMessageElement = document.querySelector('#success').content;
const errorMessageElement = document.querySelector('#error').content;
const submitButton = adFormElement.querySelector('.ad-form__submit');

const onSuccessMessageExit = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape' || !evt.target.closest('.success__message')) {
    document.querySelector('.success').remove();
  }
  document.removeEventListener('keydown', onSuccessMessageExit);
  document.removeEventListener('click', onSuccessMessageExit);
};
const showSuccessMessage = () => {
  const successPopUp = successMessageElement.cloneNode(true);
  document.body.append(successPopUp);
  document.addEventListener('keydown', onSuccessMessageExit);
  document.addEventListener('click', onSuccessMessageExit);
};

const onErrorMessageExit = (evt) => {
  const errorPopUp = errorMessageElement.cloneNode(true);
  evt.preventDefault();
  if (evt.key === 'Escape' || !evt.target.closest('.error__message') || evt.target.closest('.error__button')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onErrorMessageExit);
  document.removeEventListener('click', onErrorMessageExit);
  errorPopUp.querySelector('.error__button').removeEventListener('click', onErrorMessageExit);
};

const showErrorMessage = () => {
  const errorPopUp = errorMessageElement.cloneNode(true);
  document.body.append(errorPopUp);
  document.addEventListener('keydown', onErrorMessageExit);
  document.addEventListener('click', onErrorMessageExit);
  document.querySelector('.error__button').addEventListener('click', onErrorMessageExit);
};

//функция для деактивации формы
const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

//общая функция деактивации обеих форм
const makeFormsDisabled = () => {
  disableForm(mapFiltersElement);
  disableForm(adFormElement);
};

//функция для активации формы
const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

//инициализируем библиотеку Пристин, добавляем кастомные классы
const pristine = new Pristine(adFormElement, {
  classTo: 'pristine-custom',
  errorClass: 'pristine-custom--invalid',
  successClass: 'pristine-custom--valid',
  errorTextParent: 'pristine-custom',
  errorTextClass: 'text-pristine',
  errorTextTag: 'div'
});

//функции для валидации полей с количеством комнат и количеством гостей и генерация сообщения об ошибке
const validateRoomNumberInput = () => ROOM_CAPACITY[roomNumberInputElement.value].includes(capacityInputElement.value);
const getCapacityErrorMessage = () => `Размещение в ${roomNumberInputElement.value} ${roomNumberInputElement.value === '1' ? 'комнате' : 'комнатах'} для ${capacityInputElement.value} ${capacityInputElement.value === '1' ? 'гостя' : 'гостей'} невозможно`;
const onSyncValidCapacityRoom = () => pristine.validate([roomNumberInputElement, capacityInputElement]);

//функции синхронизации для чекина и чекаута для передачи по ссылке при изменении значения одного из полей
const onCheckInInputChange = () => {
  checkInInputElement.value = checkOutInputElement.value;
};

const onCheckOutInputChange = () => {
  checkOutInputElement.value = checkInInputElement.value;
};

//функции для валидации поля с ценой в зависимости от выбранного типа жилья и генерации сообщения об ошибке
const validatePriceInput = () => priceInputElement.value>= MIN_PRICE_OF_HOUSING[housingTypeInputElement.value];
const getPriceErrorMessage = () => {
  if (priceInputElement.value <= MIN_PRICE_OF_HOUSING[housingTypeInputElement.value]) {
    return `минимальная цена ${MIN_PRICE_OF_HOUSING[housingTypeInputElement.value]}`;
  }
};

//функция для обработки изменения поля с выбором жилья
const onHousingTypeInputChange = () => {
  priceInputElement.min = MIN_PRICE_OF_HOUSING[housingTypeInputElement.value];
  priceInputElement.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInputElement.value];
};
//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  priceInputElement.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInputElement.value];
  capacityInputElement.selectedIndex = 3;
  pristine.reset();
  adFormElement.reset();
  priceSliderElement.noUiSlider.set(MIN_PRICE_OF_HOUSING[housingTypeInputElement.value]);
  resetPhotos();
};

// Блокируем кнопку при отправке формы
const blockSubmitButton = () => {
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.textContent = 'Отправляю...';
};

// Разблокируем кнопку
const unblockSubmitButton = () => {
  submitButton.removeAttribute('disabled');
  submitButton.textContent = 'Опубликовать';
};

const onSendSuccess = () => {
  showSuccessMessage();
  unblockSubmitButton();
  resetAdForm();
};

const onSendError = () => {
  showErrorMessage();
  unblockSubmitButton();
};
//функция обработки события отправки формы для передачи по ссылке
const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(onSendSuccess, onSendError, new FormData(evt.target));
  } else {
    onSendError();
  }
};


//инициализируем слайдер и настраиваем его
const initNoUiSlider = () => {
  noUiSlider.create(priceSliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: MIN_PRICE_OF_HOUSING[housingTypeInputElement.value],
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  priceSliderElement.noUiSlider.on('update', (values, handle) => {
    priceInputElement.value = values[handle];
  });

  priceInputElement.addEventListener('change', function () {
    priceSliderElement.noUiSlider.set(this.value);
  });

  housingTypeInputElement.addEventListener('change',  () => {
    priceSliderElement.noUiSlider.set(MIN_PRICE_OF_HOUSING[housingTypeInputElement.value]);
  });
};

//функция-сборка всех функций связянных с валидацией и отправкой формы
const getFormValidation = () => {
  initNoUiSlider();
  adFormElement.addEventListener('submit', onAdFormSubmit);
  pristine.addValidator(priceInputElement, validatePriceInput, getPriceErrorMessage);
  pristine.addValidator(capacityInputElement, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInputElement, validateRoomNumberInput, getCapacityErrorMessage);
  housingTypeInputElement.addEventListener('change', onHousingTypeInputChange);
  checkInInputElement.addEventListener('change', onCheckOutInputChange);
  checkOutInputElement.addEventListener('change', onCheckInInputChange);
  roomNumberInputElement.addEventListener('change', onSyncValidCapacityRoom);
  capacityInputElement.addEventListener('change', onSyncValidCapacityRoom);
};

export {enableForm, mapFiltersElement, adFormElement, resetAdForm, makeFormsDisabled, getFormValidation};

