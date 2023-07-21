const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCardAdd = document.querySelector('.popup_add_card');

const inputName = document.querySelector('.popup__input_name');
const inputDescription = document.querySelector('.popup__input_description');
const inputNameCard = popupCardAdd.querySelector('.popup__input_card-name');
const inputLinkCard = popupCardAdd.querySelector('.popup__input_card-link');

const templateCard = document.querySelector('#gallery__item-template');
const cardItem = templateCard.content.querySelector('.gallery__item');
const cardItemList = document.querySelector('.gallery__list');

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__photo-title');
const popupPhotoSource = popupPhoto.querySelector('.popup__photo-source');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formProfile = document.querySelector('.popup__form-edit');
const formCard = popupCardAdd.querySelector('.popup__form_add');

const editButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('.popup__button-close-profile');
const closeButtons = document.querySelectorAll('.popup__button-close');
const addCardButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = document.querySelector('.popup__button-close_card');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close_photo');
const popupCreateCardButton = document.querySelector('#create-card');
const popupSaveProfileButton = document.querySelector('#save-profile');


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
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popupSaveProfileButton.setAttribute('disabled', true);
  closePopup(popupProfile);
}

function handleCreateCard(item) {
  const newCard = cardItem.cloneNode(true);
  const titleCard = newCard.querySelector('.gallery__title');
  const likeButton = newCard.querySelector('.gallery__button-like');
  const deleteButton = newCard.querySelector('.gallery__button-delete');
  const imageCard = newCard.querySelector('.gallery__photo');

  titleCard.textContent = item.name;
  imageCard.src  = item.link;
  imageCard.alt = item.name;

  const handleLikeCard = function() {
    likeButton.classList.toggle('gallery__button-like_active');
  };

  const handleDeleteCard = function() {
    newCard.remove();
  };

  const handleOpenPhoto = function () {
    openPopup(popupPhoto);
    popupPhotoSource.src = imageCard.src;
    popupPhotoTitle.textContent = item.name;
    popupPhotoSource.alt = item.name;
  };

  likeButton.addEventListener ('click', handleLikeCard);
  deleteButton.addEventListener ('click', handleDeleteCard);
  imageCard.addEventListener('click', handleOpenPhoto);

  return newCard;
};

function init () {
initialCards.forEach(function(item) {
  const newCard = handleCreateCard(item);
  cardItemList.append(newCard);
});
}

function handleAddCard (evt) {
  evt.preventDefault();
  const name = inputNameCard.value;
  const link = inputLinkCard.value;

  cardItemList.prepend(handleCreateCard({name, link}));
  evt.target.reset();
  popupCreateCardButton.setAttribute('disabled', true);
  closePopup(popupCardAdd);
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

init();
