import {enableForm, mapFilters, adForm, resetAdForm} from './form.js';
import {getAdvertisements} from './create-advertisements.js';
//import {createAdvertisements} from './mock-data.js';
import {getData} from './api.js';

const addressInputElement = document.querySelector('#address');
const resetButtonElement = document.querySelector('.ad-form__reset');
//const advertsData = createAdvertisements();
const ADVERTS_AMOUNT = 10;
const PRECISE_NUMBER = 5;
const ZOOM = 10;
const DEFAULT_LAT_LNG = {
  lat: 35.65952,
  lng: 139.78179,
};
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
let map = null;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const secondaryPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

//создаем маркер для выбора адреса в объявлении
const mainPinMarker = L.marker(
  {
    lat:DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

//создаем карту, добавляем тайл и главный маркет
const initMap = () => {
  map = L.map('map-canvas')
    .on('load', onDefaultMap)
    .setView(DEFAULT_LAT_LNG, ZOOM);
  L.tileLayer(
    TILE_LAYER,
    {
      attribution: ATTRIBUTION,
    },
  ).addTo(map);
  mainPinMarker.addTo(map);
};

initMap();

//создаем слой для отрисовки маркеров и добавляем на карту
const markerGroup = L.layerGroup().addTo(map);

//рисуем маркер и добавляем попап, куда передаем данные с объектом объявления
const createSecondaryMarker =  (adData) => {
  const marker = L.marker({
    lat: adData.location.lat,
    lng: adData.location.lng,
  },
  {
    secondaryPinIcon,
  },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(getAdvertisements(adData));
};

//создаем маркеры на основе данных полученных с сервера (пока моковые)
const createAdvertsMarkers  = (data) => {
  data.forEach((dataElement) => {
    createSecondaryMarker(dataElement);
  });
};

//createAdvertsMarkers(advertsData);
//функция для отрисовки состояния карты по умолчанию
function onDefaultMap  () {
  addressInputElement.value = `${DEFAULT_LAT_LNG.lat} ${DEFAULT_LAT_LNG.lng}`;
  getData(
    (dataList) => {
      createAdvertsMarkers(dataList.slice(0, ADVERTS_AMOUNT));
      enableForm(adForm);
      enableForm(mapFilters);
    },
  );
}
//отслеживаем координаты маркера и записывем их в значение поля с адресом
mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInputElement.value = `${lat.toFixed(PRECISE_NUMBER)}, ${lng.toFixed(PRECISE_NUMBER)}`;
  map.setView(evt.target.getLatLng(), ZOOM);
});

//сброс всех элементов к начальному состоянию
const resetAllElements = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
  });
  map.setView(DEFAULT_LAT_LNG, ZOOM);
  map.closePopup();
  mapFilters.reset();
  onDefaultMap();
  adForm.reset();
  resetAdForm();
};
resetButtonElement.addEventListener('click', resetAllElements);

export {createAdvertsMarkers};
