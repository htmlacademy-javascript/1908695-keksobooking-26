const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingTypeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInInput = adForm.querySelector('#timein');
const checkOutInput = adForm.querySelector('#timeout');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const priceSlider = adForm.querySelector('.ad-form__slider');

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

//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  capacityInput.value = '1';
  pristine.reset();
};

//функции для валидации полей с количеством комнат и количеством гостей и генерация сообщения об ошибке
const validateRoomNumberInput = () => ROOM_CAPACITY[roomNumberInput.value].includes(capacityInput.value);
const getCapacityErrorMessage = () => `Размещение в ${roomNumberInput.value} ${roomNumberInput.value === '1' ? 'комнате' : 'комнатах'} для ${capacityInput.value} ${capacityInput.value === '1' ? 'гостя' : 'гостей'} невозможно`;
const onSyncValidCapacityRoom = () => pristine.validate([roomNumberInput, capacityInput]);

//функции синхронизации для чекина и чекаута для передачи по ссылке при изменении значения одного из полей
const onCheckInInputChange = () => {
  checkInInput.value = checkOutInput.value;
};

const onCheckOutInputChange = () => {
  checkOutInput.value = checkInInput.value;
};

//функции для валидации поля с ценой в зависимости от выбранного типа жилья и генерации сообщения об ошибке
const validatePriceInput = () => priceInput.value>= MIN_PRICE_OF_HOUSING[housingTypeInput.value];
const getPriceErrorMessage = () => {
  if (priceInput.value <= MIN_PRICE_OF_HOUSING[housingTypeInput.value]) {
    return `минимальная цена ${MIN_PRICE_OF_HOUSING[housingTypeInput.value]}`;
  }
};

//функция для обработки изменения поля с выбором жилья
const onHousingTypeInputChange = () => {
  priceInput.min = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
};

//функция обработки события отправки формы для передачи по ссылке
const onAdFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

//инициализируем слайдер и настраиваем его
noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: MIN_PRICE_OF_HOUSING[housingTypeInput.value],
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

priceSlider.noUiSlider.on('update', (values, handle) => {
  priceInput.value = values[handle];
});

priceInput.addEventListener('change', function () {
  priceSlider.noUiSlider.set(this.value);
});

housingTypeInput.addEventListener('change',  () => {
  priceSlider.noUiSlider.set(MIN_PRICE_OF_HOUSING[housingTypeInput.value]);
});

/*const makeSliderDisabled = () => {
  priceSlider.setAttribute('disabled', 'disabled');
};

const makeSliderEnabled = () => {
  priceSlider.removeAttribute('disabled');
};*/

//функция-сборка всех функций связянных с валидацией и отправкой формы
const getFormValidation = () => {
  adForm.addEventListener('submit', onAdFormSubmit);
  pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);
  pristine.addValidator(capacityInput, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInput, validateRoomNumberInput, getCapacityErrorMessage);
  housingTypeInput.addEventListener('change', onHousingTypeInputChange);
  checkInInput.addEventListener('change', onCheckOutInputChange);
  checkOutInput.addEventListener('change', onCheckInInputChange);
  roomNumberInput.addEventListener('change', onSyncValidCapacityRoom);
  capacityInput.addEventListener('change', onSyncValidCapacityRoom);
};

//функции ниже потом внесу в другие функции когда под них появится логика
getFormValidation();
//disableForm(adForm);
disableForm(mapFilters);
resetAdForm();

export {enableForm, mapFilters, adForm, resetAdForm, disableForm};

