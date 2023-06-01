const popup = document.querySelectorAll('.popup');

// Попап редакьирования профиля
const editButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('#profile-close');
const formElement = document.querySelector('#edit-form');
const popupProfile = document.querySelector('#popup-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('#popup__name-input')
const inputDescription = document.querySelector('#popup__description-input');

// Попап добавления карточки
const addCardButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = document.querySelector('#card-close');
const popupCardAdd = document.querySelector('#popup-add');
const formCard = popupCardAdd.querySelector('#add_form');
const inputNameCard = popupCardAdd.querySelector('#popup_card-name');
const inputLinkCard = popupCardAdd.querySelector('#popup_card-link');

// Карточки
const templateCard = document.querySelector('#gallery__item-template');
const cardItem = templateCard.content.querySelector('.gallery__item');
const cardItemList = document.querySelector('.gallery__list');

// Попап с фото
const popupPhoto = document.querySelector('#popup-photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__photo-title');
const popupPhotoSource = popupPhoto.querySelector('.popup__photo-source');
const popupPhotoCloseButton = popupPhoto.querySelector('#photo-close');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

// Открытие попапа редактирования профиля
editButton.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
});

// Закрытие попапа редактирования профиля
popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

// Открытие попапа добавления карточки
addCardButton.addEventListener('click', function() {
  openPopup(popupCardAdd);
});

// Закрытие попапа добавления карточки
popupCardCloseButton.addEventListener('click', function () {
  closePopup(popupCardAdd);
});

// Закрытие попапа с фото
popupPhotoCloseButton.addEventListener('click', function () {
  closePopup(popupPhoto);
});

// Сохранение инфы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}
//Обработчик формы редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);

// Функция создания карточки
function createCard(item) {
  const newCard = cardItem.cloneNode(true);
  const titleCard = newCard.querySelector('.gallery__title');
  const likeButton = newCard.querySelector('.gallery__button-like');
  const deleteButton = newCard.querySelector('.gallery__button-delete')

  titleCard.textContent = item.name;

  const imageCard = newCard.querySelector('.gallery__photo');
  imageCard.src  = item.link;
  imageCard.alt = item.name;

  //Кнопка лайка карточки
  likeButton.addEventListener ('click', function(event) {
    likeButton.classList.toggle('gallery__button-like_active');
  });

  //Кнопка удаления карточки
  deleteButton.addEventListener('click', function(event) {
    newCard.remove();
  });

  //Открытие попапа с фото
  imageCard.addEventListener('click', function () {
    openPopup(popupPhoto);
    popupPhotoSource.src = imageCard.src;
    popupPhotoTitle.textContent = item.name;
    popupPhotoSource.alt = item.name;
  });

  return newCard;
};

//Подгрузка 6 карточек
initialCards.forEach(function(item) {
  const newCard = createCard(item);
  cardItemList.append(newCard);
});

// Добавление новой карточки
formCard.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = inputNameCard.value;
  const link = inputLinkCard.value;

  cardItemList.prepend(createCard({name, link}));
  event.target.reset();

  closePopup(popupCardAdd);
});

