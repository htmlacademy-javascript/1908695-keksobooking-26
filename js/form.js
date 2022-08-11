
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingTypeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInInput = document.querySelector('#timein');
const checkOutInput = document.querySelector('#timeout');

const MIN_PRICE_OF_HOUSING = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const ROOM_CAPACITY = {
  1: ['для 1 гостя'],
  2: ['для 2 гостей', 'для 1 гостя'],
  3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  100: ['не для гостей']
};

//функция для деактивации формы
const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};
//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
};

//функция для активации формы пока закомментирована, чтобы линтер не ругался на неиспользованную функцию в коде
/*const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.removeAttribute('disabled');
  });
};*/

//инициализируем библиотеку Пристин, добавляем кастомные классы
const pristine = new Pristine(adForm, {
  classTo: 'pristine-custom',
  errorClass: 'pristine-custom--invalid',
  successClass: 'pristine-custom--valid',
  errorTextParent: 'pristine-custom',
  errorTextClass: 'text-pristine',
  errorTextTag: 'div'
});

//функции синхронизации для чекина и чекаута для передачи по ссылке при изменении значения одного из полей
const onCheckInInputChange = () => {
  checkOutInput.value = checkInInput.value;
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

//функция-сборка всех функций связянных с валидацией и отправкой формы
const getFormValidation = () => {
  adForm.addEventListener('submit', onAdFormSubmit);
  pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);
  housingTypeInput.addEventListener('change', onHousingTypeInputChange);
  checkInInput.addEventListener('change', onCheckInInputChange);
  checkInInput.addEventListener('change', onCheckOutInputChange);
};

//функции ниже потом внесу в другие функции когда под них появится логика
getFormValidation();
//disableForm(adForm);
disableForm(mapFilters);
resetAdForm();


