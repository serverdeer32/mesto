export const initialCards = [
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

export class Card {
  constructor(cardData, templateSelector, openImagePopup) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const newCard = document.querySelector(this._templateSelector)
    .content
    .querySelector('.gallery__item')
    .cloneNode(true);
    return newCard;
  }

  _handleOpenPhoto() {
    this._openImagePopup(this._cardData);
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('gallery__button-like_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._imageCard.addEventListener('click', () => {
      this._handleOpenPhoto();
    })

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    })
  }

  generateCard() {
    this._element = this._getTemplate();

    this._title = this._element.querySelector('.gallery__title')
    this._likeButton = this._element.querySelector('.gallery__button-like');
    this._imageCard = this._element.querySelector('.gallery__photo');
    this._deleteButton = this._element.querySelector('.gallery__button-delete');

    this._imageCard.src = this._image;
    this._imageCard.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
