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
const createImage = (objectKey) => {
  const newImage = document.createElement('img');
  newImage.classList.add('popup__photo');
  newImage.width = IMG_WIDTH;
  newImage.height = IMG_HEIGHT;
  newImage.alt = 'Фотография жилья';
  newImage.src = objectKey;
  return newImage;
};

const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');

const getAdvertisements = (dataList) => {
  const advertisementElement = advertisementTemplate.cloneNode(true);
  const popupFeatureItems = advertisementElement.querySelectorAll('.popup__feature');
  const popupPhotoList = advertisementElement.querySelector('.popup__photos');
  const popupPhotos = popupPhotoList.querySelector('.popup__photo');

  Object.keys(dataList.offer).forEach((key) => {
    if (!key) {
      advertisementElement.querySelector(`.popup__${OFFER_KEYS[key]}`).classList.add('hidden');
    }
  });

  advertisementElement.querySelector('.popup__title').textContent = dataList.offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = dataList.offer.address;
  advertisementElement.querySelector('.popup__text--price').firstChild.data = dataList.offer.price;
  advertisementElement.querySelector('.popup__type').textContent = housingType[dataList.offer.type];
  advertisementElement.querySelector('.popup__text--capacity').textContent = `${dataList.offer.rooms} комнаты для ${dataList.offer.guests} гостей`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${dataList.offer.checkin}, выезд до ${dataList.offer.checkout}`;
  advertisementElement.querySelector('.popup__description').textContent = dataList.offer.description;
  const modifiers = dataList.offer.features.map((feature) => `popup__feature--${feature}`);
  popupFeatureItems.forEach((popupFeatureItem) => {
    const modifier = popupFeatureItem.classList[1];
    if (!modifiers.includes(modifier)) {
      popupFeatureItem.remove();
    }
  });
  if (dataList.offer.photos) {
    dataList.offer.photos.forEach((photo) => popupPhotoList.appendChild(createImage(photo)));
  }
  popupPhotos.remove();

  if (!dataList.author.avatar) {
    advertisementElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  advertisementElement.querySelector('.popup__avatar').src = dataList.author.avatar;
  return advertisementElement;

};

export {getAdvertisements};

