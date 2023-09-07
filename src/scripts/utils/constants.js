export const formValidatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const userInfoConfig = {
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profileAvatar: '.profile__avatar-img'
}

export const editButton = document.querySelector('.profile__button-edit');
export const addCardButton = document.querySelector('.profile__button-add');
export const editAvatarButton = document.querySelector('.profile__avatar');

export const templateSelector = '.gallery__item-template';
export const popupImageSelector = '.popup_photo';
export const popupProfileSelector = '.popup_profile';
export const popupAddCardSelector = '.popup_add_card';
export const popupEditAvatarSelector = '.popup_edit_avatar';
export const popupDeleteCardSelector = '.popup_delete_card'
export const galleryList = '.gallery__list';

export const popupCardAdd = document.querySelector('.popup_add_card');
export const popupProfile = document.querySelector('.popup_profile');
export const formCard = popupCardAdd.querySelector('.popup__form_add');

export const fordEditAvatar = document.querySelector('.popup__form_edit-avatar');
