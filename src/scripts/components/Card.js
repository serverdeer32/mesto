export class Card {
  constructor(cardData, templateSelector, openImagePopup) {
    this._cardData = cardData;
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

  _handleOpenPhoto = () => {
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

    this._imageCard.src = this._cardData.link;
    this._imageCard.alt = this._cardData.name;
    this._title.textContent = this._cardData.name;

    this._setEventListeners();
    return this._element;
  }
}
