const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingTypeInputElement = adForm.querySelector('#type');
const priceInputElement = adForm.querySelector('#price');
const checkInInputElement = adForm.querySelector('#timein');
const checkOutInputElement = adForm.querySelector('#timeout');
const roomNumberInputElement = adForm.querySelector('#room_number');
const capacityInputElement = adForm.querySelector('#capacity');
const priceSliderElement = adForm.querySelector('.ad-form__slider');

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

//функция для деактивации формы
const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
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
const pristine = new Pristine(adForm, {
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

//функция обработки события отправки формы для передачи по ссылке
const onAdFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
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

/*const makeSliderDisabled = () => {
  priceSlider.setAttribute('disabled', 'disabled');
};

const makeSliderEnabled = () => {
  priceSlider.removeAttribute('disabled');
};*/

//функция-сборка всех функций связянных с валидацией и отправкой формы
const getFormValidation = () => {
  initNoUiSlider();
  adForm.addEventListener('submit', onAdFormSubmit);
  pristine.addValidator(priceInputElement, validatePriceInput, getPriceErrorMessage);
  pristine.addValidator(capacityInputElement, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInputElement, validateRoomNumberInput, getCapacityErrorMessage);
  housingTypeInputElement.addEventListener('change', onHousingTypeInputChange);
  checkInInputElement.addEventListener('change', onCheckOutInputChange);
  checkOutInputElement.addEventListener('change', onCheckInInputChange);
  roomNumberInputElement.addEventListener('change', onSyncValidCapacityRoom);
  capacityInputElement.addEventListener('change', onSyncValidCapacityRoom);
};
//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  //housingTypeInputElement.value = 'flat';
  priceInputElement.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInputElement.value];
  capacityInputElement.value = '1';
  pristine.reset();
  adForm.reset();
  priceSliderElement.noUiSlider.set(MIN_PRICE_OF_HOUSING[housingTypeInputElement.value]);
};

//функции ниже потом внесу в другие функции когда под них появится логика
getFormValidation();
//disableForm(adForm);
disableForm(mapFilters);

export {enableForm, mapFilters, adForm, resetAdForm, disableForm};

