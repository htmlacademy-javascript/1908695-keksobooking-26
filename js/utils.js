//функция для возврата случайного целого числа в заданном диаипазоне
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

getRandomPositiveInteger(5, 15);
//функция для возврата случайного числа с плавающей точкой в заданном диапазоне
function getRandomPositiveFloat (a, b, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
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
  return +result.toFixed(digits);
}

//функция возвращает случайное число из диапазона
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

//функция возвращает массив случайных неповторяющихся элементов в заданном количестве
function getRandomArrayElements (array, quantity) {
  return array.slice().sort(() => 0.5 - Math.random()).slice(0, quantity);
}
//функция для получения случайного неповторяющегося элемента
const getRandomArrayUniqueElement = (elements) => {
  const elementsCopy = elements.slice();
  const randomElement = elementsCopy[getRandomPositiveInteger(0, elements.length-1)];
  elements.splice(elements.indexOf(randomElement), 1);
  return randomElement;
};
export {getRandomArrayElement, getRandomPositiveInteger, getRandomArrayElements, getRandomPositiveFloat, getRandomArrayUniqueElement};
