import {getRandomArrayElement, getRandomPositiveInteger, getRandomArrayElements, getRandomPositiveFloat, getRandomArrayUniqueElement} from './utils.js';

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
const PRICES = Array.from({length:1e5}, (_, index) => index+ 500);
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

const FEATURES = getRandomArrayElements(FEATURES_ELEMENTS, getRandomPositiveInteger(1, 6));
const PHOTOS_ELEMENTS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const PHOTOS = getRandomArrayElements(PHOTOS_ELEMENTS, getRandomPositiveInteger(1, 3));
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
      features: FEATURES,
      description: getRandomArrayUniqueElement(DESCRIPTIONS),
      photos: PHOTOS,
    },
  };
};

//создаем массив из 10 случайных объявлений
const  createAdvertisements = () =>  Array.from({length: ADVERTISEMENTS_AMOUNT}, createAdvertisement);

export {createAdvertisements};

