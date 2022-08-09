import {getRandomArrayElement, getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayUniqueElement} from './utils.js';

const TITLES = [
  'the best offer',
  'for sale',
  'on the seaside',
  'the best view over the city',
  'price lower than ever',
  'elite real estate',
  'shift expectations',
  'three bedroom apartment',
  'for non-smoking guests only',
  'pets allowed'
];
const ADVERTISEMENTS_AMOUNT = 10;
const AVATARS = [];
const PRICES = [20000, 30000, 55000, 40000, 18000, 25000, 13000, 19000, 33000, 70000];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const ROOMS = Array.from({length:5}, (_, index) => index+ 1);
const GUESTS = Array.from({length:10}, (_, index) => index+ 1);
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const DESCRIPTIONS = [
  'clean',
  'cozy',
  'roomy and light',
  'very private',
  'luxury',
  'value for money',
  'all inclusive',
  'all necessary facilities provided',
  'for big family',
  'comfortable and elegant'
];
const FEATURES_ELEMENTS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS_ELEMENTS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getMockDataArray = (array, value) => {
  const newArray= [];
  const elementsAmount = getRandomPositiveInteger(1, value);
  for (let i = 0; i < elementsAmount; i++) {
    newArray.push(getRandomArrayElement(array));
  }
  return newArray;
};

for (let i = 1; i <= ADVERTISEMENTS_AMOUNT; i++) {
  AVATARS.push(`img/avatars/user${i.toString().padStart(2, '0')}.png`);
}

//создаем один объект объявления
const createAdvertisement = () => {
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
  return {
    author: {
      avatar: getRandomArrayUniqueElement(AVATARS),
    },
    location: {
      lat: Number(`${location['lat']}`),
      lng: Number(`${location['lng']}`),
    },
    offer: {
      title: getRandomArrayUniqueElement(TITLES),
      address:`${location['lat']} ${location['lng']}`,
      price: getRandomArrayElement(PRICES),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomArrayElement(ROOMS),
      guests: getRandomArrayElement(GUESTS),
      checkin: getRandomArrayElement(CHECKINS),
      checkouts: getRandomArrayElement(CHECKOUTS),
      features: getMockDataArray(FEATURES_ELEMENTS, 6),
      description: getRandomArrayUniqueElement(DESCRIPTIONS),
      photos: getMockDataArray(PHOTOS_ELEMENTS, 3),
    },
  };
};

//создаем массив из 10 случайных объявлений
const  createAdvertisements = () =>  Array.from({length: ADVERTISEMENTS_AMOUNT}, createAdvertisement);

export {createAdvertisements};

