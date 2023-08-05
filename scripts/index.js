import { Card, initialCards } from "./Card.js"
import { FormValidator, validationElements } from "./FormValidator.js";

const popupPhoto = document.querySelector('.popup_photo');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formProfile = document.querySelector('.popup__form-edit');
const editButton = document.querySelector('.profile__button-edit');
const inputName = document.querySelector('.popup__input_name');
const inputDescription = document.querySelector('.popup__input_description');

const popupCardAdd = document.querySelector('.popup_add_card');
const inputNameCard = popupCardAdd.querySelector('.popup__input_card-name');
const inputLinkCard = popupCardAdd.querySelector('.popup__input_card-link');
const formCard = popupCardAdd.querySelector('.popup__form_add');
const addCardButton = document.querySelector('.profile__button-add');

const popupPhotoTitle = popupPhoto.querySelector('.popup__photo-title');
const popupPhotoSource = popupPhoto.querySelector('.popup__photo-source');

const closeButtons = document.querySelectorAll('.popup__button-close');
const galleryList = document.querySelector('.gallery__list')
const templateSelector = '.gallery__item-template';

const formEditProfile = new FormValidator(validationElements, popupProfile);
formEditProfile.enableValidation();

const formAddCard = new FormValidator(validationElements, formCard);
formAddCard.enableValidation();

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupCloseEsc);
  document.addEventListener('mousedown', handleOverlayClose);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupCloseEsc);
  document.removeEventListener('mousedown', handleOverlayClose);
}

function openImagePopup(cardData) {
  popupPhotoSource.src = cardData.link;
  popupPhotoTitle.textContent = cardData.name;
  popupPhotoSource.alt = cardData.name;
  openPopup(popupPhoto);
}

function handlePopupCloseEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const handleOverlayClose = (evt) => {
  const popupOverlay = evt.target.classList.contains('popup');
  if (popupOverlay) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
  formEditProfile.resetValidation();
}

function handleAddCard (evt) {
  evt.preventDefault();
  const cardDataAdd = {name: inputNameCard.value, link: inputLinkCard.value};
  const card = new Card(cardDataAdd, templateSelector, openImagePopup);
  const cardElement = card.generateCard();

  galleryList.prepend(cardElement);

  closePopup(popupCardAdd);
  formCard.reset();
  formAddCard.resetValidation();
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
});

addCardButton.addEventListener('click', function() {
  openPopup(popupCardAdd);
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleAddCard);

function init () {
  initialCards.forEach((item) => {
    const card = new Card(item, templateSelector, openImagePopup);
    const cardElement = card.generateCard();

    galleryList.prepend(cardElement);
  })
};

init();
