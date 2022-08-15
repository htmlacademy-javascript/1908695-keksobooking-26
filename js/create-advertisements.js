import  {createAdvertisements} from './mock-data.js';

const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;
const housingType = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const OFFER_KEYS = {
  title: 'title',
  address: 'text--address',
  price: 'text--price',
  type: 'type',
  rooms: 'text--capacity',
  guests: 'text--capacity',
  checkin: 'text--time',
  checkout: 'text--time',
  features: 'features',
  description: 'description',
  photos: 'photos',
};

const mapCanvas = document.querySelector('#map-canvas');
const advertisementTemplate = document.querySelector('#card').content.querySelector('article.popup');

const advertisements = createAdvertisements();

const advertisementsFragment = document.createDocumentFragment();

const checkDataPresentation = (advertOffer, advertOfferKeys) => {
  Object.keys(advertOfferKeys).forEach((advertOfferKey) => {
    if (!advertOfferKey) {
      advertOffer.querySelector(`.popup__${OFFER_KEYS[advertOfferKey]}`).classList.add('hidden');
    }
  });
};

const createImage = (avertOfferPhotosKey) => {
  const newImage = document.createElement('img');
  newImage.classList.add('popup__photo');
  newImage.width = IMG_WIDTH;
  newImage.height = IMG_HEIGHT;
  newImage.alt = 'Фотография жилья';
  newImage.src = avertOfferPhotosKey;
  return newImage;
};

const getAdvertisements = () => {
  mapCanvas.innerHTML = '';
  advertisements.forEach(({author: {avatar}, offer: {title, address,price, type, rooms, guests, checkin, checkouts, features, description, photos}}) => {
    const advertisementElement = advertisementTemplate.cloneNode(true);
    const popupPhotos = advertisementElement.querySelector('.popup__photos');
    const popupPhoto = advertisementElement.querySelector('.popup__photo');
    const popupFeatureItems = advertisementElement.querySelectorAll('.popup__feature');

    checkDataPresentation(advertisementElement, {title, address,price, type, rooms, guests, checkin, checkouts, features, description, photos});
    advertisementElement.querySelector('.popup__avatar').src = avatar;
    advertisementElement.querySelector('.popup__title').textContent = title;
    advertisementElement.querySelector('.popup__text--address').textContent = address;
    advertisementElement.querySelector('.popup__text--price').firstChild.data = price;
    advertisementElement.querySelector('.popup__type').textContent = housingType[type];
    advertisementElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
    advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkouts}`;
    advertisementElement.querySelector('.popup__description').textContent = description;
    for (let i = 0; i < photos.length; i++) {
      popupPhotos.append(createImage(photos[i]));
    }
    popupPhoto.remove();
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    popupFeatureItems.forEach((popupFeatureItem) => {
      const modifier = popupFeatureItem.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeatureItem.remove();
      }
    });

    advertisementsFragment.append(advertisementElement);
  });
  mapCanvas.append(advertisementsFragment.firstElementChild);
};
export {getAdvertisements};

