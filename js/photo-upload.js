//помимо ограничений в html накладываем ограничения на типы файлов на случай если пользователь изменит разметку через инструменты разработчика
const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'svg', 'png', 'webp'];

const avatarInputElement = document.querySelector('.ad-form-header__input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const housePicInputElement = document.querySelector('.ad-form__input');
const housePicPreviewElement = document.querySelector('.ad-form__photo');

//функция для проверки валидности типа загружаемого файла
const checkFileType = (inputElement) => {
  const file = inputElement.files[0];
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

//функция для загрузки фото в поле "аватар"
const onAvatarChange = () => {
  if (checkFileType(avatarInputElement)) {
    avatarPreviewElement.src = URL.createObjectURL(avatarInputElement.files[0]);
  }
};

//функция для загрузки фото в поле "фото жилья"
const onHousePictureChange = () => {
  if (checkFileType(housePicInputElement)) {
    const photo = document.createElement('img');
    photo.style.width = '70px';
    photo.style.height = '70px';
    photo.src = URL.createObjectURL(housePicInputElement.files[0]);
    housePicPreviewElement.append(photo);
  }
};

//обработчики событий на скрытые инпуты для загрузки файла
avatarInputElement.addEventListener('change', onAvatarChange);
housePicInputElement.addEventListener('change', onHousePictureChange);


//функция сброса всех фото для кнопки возращающей все значения формы объявления к исходным
const resetPhotos = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  avatarPreviewElement.style.width = '40px';
  avatarPreviewElement.style.height = '44px';
  housePicPreviewElement.textContent = '';
};

export {resetPhotos};

