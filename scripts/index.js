const editButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('.popup__button-close-profile');
const formProfile = document.querySelector('.popup__form-edit');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_name')
const inputDescription = document.querySelector('.popup__input_description');

const addCardButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = document.querySelector('.popup__button-close_card');
const popupCardAdd = document.querySelector('.popup_add_card');
const formCard = popupCardAdd.querySelector('.popup__form_add');
const inputNameCard = popupCardAdd.querySelector('.popup__input_card-name');
const inputLinkCard = popupCardAdd.querySelector('.popup__input_card-link');

const templateCard = document.querySelector('#gallery__item-template');
const cardItem = templateCard.content.querySelector('.gallery__item');
const cardItemList = document.querySelector('.gallery__list');

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__photo-title');
const popupPhotoSource = popupPhoto.querySelector('.popup__photo-source');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close_photo');

const popups = document.querySelectorAll('.popup');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressKeyEsc);
  document.addEventListener('mousedown', handlePopupClose);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressKeyEsc);
  document.removeEventListener('mousedown', handlePopupClose);
}

function pressKeyEsc (evt) {
  if (evt.key === 'Escape') {
    popups.forEach(closePopup);
  }
}

editButton.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

const handlePopupClose = (evt) => {
  const popupOverlay = evt.target.classList.contains('popup');
  if (popupOverlay) {
    popups.forEach(closePopup);
  }
};

addCardButton.addEventListener('click', function() {
  openPopup(popupCardAdd);
});

popupCardCloseButton.addEventListener('click', function () {
  closePopup(popupCardAdd);
});

popupPhotoCloseButton.addEventListener('click', function () {
  closePopup(popupPhoto);
});

formProfile.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
}

function createCard(item) {
  const newCard = cardItem.cloneNode(true);
  const titleCard = newCard.querySelector('.gallery__title');
  const likeButton = newCard.querySelector('.gallery__button-like');
  const deleteButton = newCard.querySelector('.gallery__button-delete')
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

initialCards.forEach(function(item) {
  const newCard = createCard(item);
  cardItemList.append(newCard);
});

function handleAddCard (evt) {
  evt.preventDefault();
  const name = inputNameCard.value;
  const link = inputLinkCard.value;

  cardItemList.prepend(createCard({name, link}));
  evt.target.reset();

  closePopup(popupCardAdd);
}

formCard.addEventListener('submit', handleAddCard);
