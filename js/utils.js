const ALERT_SHOW_TIME = 5000;
//const TIMEOUT_DELAY = 500;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
//функция для возврата случайного целого числа в заданном диаипазоне
/*const getRandomPositiveInteger = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(Math.abs(minValue), Math.abs(maxValue)));
  const upper = Math.floor(Math.max(Math.abs(minValue), Math.abs(maxValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//функция для возврата случайного числа с плавающей точкой в заданном диапазоне
function getRandomPositiveFloat (minValue, maxValue, digitsAfterPoint) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(minValue), Math.abs(maxValue));
  const upper = Math.max(Math.abs(minValue), Math.abs(maxValue));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки.
  // Метод возвращает строку, поэтому с помощью унарного плюса превращаем её в число
  return +result.toFixed(digitsAfterPoint);
}

//функция возвращает случайное число из диапазона
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//функция возвращает массив случайных неповторяющихся элементов в заданном количестве
/*function getRandomArrayElements (array, quantity) {
  return array.slice().sort(() => 0.5 - Math.random()).slice(0, quantity);
}*/
//функция для получения случайного неповторяющегося элемента
/*const getRandomArrayUniqueElement = (elements) => {
  const elementsCopy = elements.slice();
  const randomElement = elementsCopy[getRandomPositiveInteger(0, elements.length-1)];
  elements.splice(elements.indexOf(randomElement), 1);
  return randomElement;
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};*/
export {showAlert};
