export const formValidatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const userInfoConfig = {
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description'
}

export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const editButton = document.querySelector('.profile__button-edit');
export const addCardButton = document.querySelector('.profile__button-add');

export const templateSelector = '.gallery__item-template';
export const popupImageSelector = '.popup_photo';
export const popupProfileSelector = '.popup_profile';
export const popupAddCardSelector = '.popup_add_card';

export const popupCardAdd = document.querySelector('.popup_add_card');
export const popupProfile = document.querySelector('.popup_profile');
export const formCard = popupCardAdd.querySelector('.popup__form_add');
export const galleryList = document.querySelector('.gallery__list')
