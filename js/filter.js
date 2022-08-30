import {debounce, TIMEOUT_DELAY} from './utils.js';
import {mapFiltersElement} from './form.js';
import {ADVERTS_AMOUNT, createAdvertsMarkers} from './map.js';

const DEFAULT_TYPE = 'any';
const PriceRanges = {
  ANY: {
    minPrice: 0,
    maxPrice: 100000,
  },
  LOW: {
    minPrice: 0,
    maxPrice: 10000,
  },
  MIDDLE: {
    minPrice: 10001,
    maxPrice: 50000,
  },
  HIGH: {
    minPrice: 50001,
    maxPrice: 100000,
  },
};
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');

const filterByHouseType = (type) => housingTypeElement.value === type || housingTypeElement.value === DEFAULT_TYPE;

const filterByPrice = (price) => {
  const priseSelect = housingPriceElement.value.toUpperCase();
  return price >= PriceRanges[priseSelect].minPrice && price <= PriceRanges[priseSelect].maxPrice;
};

const filterByRoomsCount = (roomsCount) => Number(housingRoomsElement.value) === roomsCount || housingRoomsElement.value === DEFAULT_TYPE;
const filterByGuestsCount = (guestsCount) => Number(housingGuestsElement.value) === guestsCount || housingGuestsElement.value === DEFAULT_TYPE;

const filterByFeatures = (features) => {
  const checkBoxFeatures = mapFiltersElement.querySelectorAll('.map__features :checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  }
  return checkBoxFeatures.length === 0;
};

const filterOffers = (offers, rerenderMarkers) => {
  const filteredOffers = offers.filter(({ offer }) =>
    filterByHouseType(offer.type) &&
    filterByPrice(offer.price) &&
    filterByRoomsCount(offer.rooms) &&
    filterByGuestsCount(offer.guests) &&
    filterByFeatures(offer.features)
  );
  rerenderMarkers(filteredOffers.slice(0, ADVERTS_AMOUNT));
};

const initFilters = (offers) => {
  const onMapFiltersElementChange = debounce(() => filterOffers(offers, createAdvertsMarkers), TIMEOUT_DELAY);
  mapFiltersElement.addEventListener('change', onMapFiltersElementChange);
};

export {initFilters};
