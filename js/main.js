import  {createAdvertisements} from './mock-data.js';
createAdvertisements();
import {getAdvertisements } from './create-advertisements.js';
getAdvertisements();
import './form.js';
// const onCheckOutInputChange = () => {
//   checkOutInput.value = checkInInput.value;
// };

// //функции для валидации поля с ценой в зависимости от выбранного типа жилья и генерации сообщения об ошибке
// const validatePriceInput = () => priceInput.value>= MIN_PRICE_OF_HOUSING[housingTypeInput.value];
// const getPriceErrorMessage = () => {
//   if (priceInput.value <= MIN_PRICE_OF_HOUSING[housingTypeInput.value]) {
//     return `минимальная цена ${MIN_PRICE_OF_HOUSING[housingTypeInput.value]}`;
//   }
// };

// //функция для обработки изменения поля с выбором жилья
// const onHousingTypeInputChange = () => {
//   priceInput.min = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
//   priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
// };

// //функция обработки события отправки формы для передачи по ссылке
// const onAdFormSubmit = (evt) => {
//   const isValid = pristine.validate();
//   if (!isValid) {
//     evt.preventDefault();
//   }
// };
