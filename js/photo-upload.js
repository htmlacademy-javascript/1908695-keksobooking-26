const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'svg', 'png', 'webp'];

const avatarInputElement = document.querySelector('.ad-form-header__input');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const housePicInputElement = document.querySelector('.ad-form__input');
const housePicPreviewElement = document.querySelector('.ad-form__photo');

const onAvatarChange = () => {
  const file = avatarInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
};

const onHousePictureChange = () => {
  const fileHouse = housePicInputElement.files[0];
  const fileName = fileHouse.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const photo = document.createElement('img');
    photo.style.width = '70px';
    photo.style.height = '70px';
    photo.src = URL.createObjectURL(fileHouse);
    housePicPreviewElement.append(photo);
  }
};
avatarInputElement.addEventListener('change', onAvatarChange);
housePicInputElement.addEventListener('change', onHousePictureChange);

const resetPhotos = () => {
  avatarPreviewElement.src = 'img/muffin-grey.svg';
  avatarPreviewElement.style.width = '40px';
  avatarPreviewElement.style.height = '44px';
  housePicPreviewElement.textContent = '';
};

export {resetPhotos};

