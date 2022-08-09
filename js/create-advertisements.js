import  {createAdvertisements} from './mock-data.js';

const housingTypes = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};


const mapCanvas = document.querySelector('#map-canvas');
const advertisementTemplate = document.querySelector('#card').content.querySelector('article.popup');

const advertisements = createAdvertisements();

const advertisementsFragment = document.createDocumentFragment();

advertisements.forEach(({author: {avatar}, offer: {title, address,price, type, rooms, guests, checkin, checkouts, features, description, photos}}) => {
  const advertisementElement = advertisementTemplate.cloneNode(true);
  advertisementElement.querySelector('.popup__avatar').src = avatar;
  advertisementElement.querySelector('.popup__title').textContent = title;
  advertisementElement.querySelector('.popup__text--address').textContent = address;
  advertisementElement.querySelector('.popup__text--price').firstChild.data = price;
  advertisementElement.querySelector('.popup__type').textContent = housingTypes[type];
  advertisementElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkouts}`;
  advertisementElement.querySelector('.popup__description').textContent = description;
  advertisementElement.querySelector('.popup__photos .popup__photo').src = photos;

});
