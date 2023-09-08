 export class Card {
  constructor(cardData, templateSelector, openImagePopup, openDelete, setLike) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._openDelete = openDelete;
    this._openImagePopup = openImagePopup;

    this._myId = cardData.myId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;

    this._setLike = setLike;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._isLiked = false;
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

  _handleDeleteCard = () => {
    this._openDelete({ card: this, cardId: this._cardId });
  }

  _handleLikeCard = () => {
    this._setLike(this._isLiked, this._cardId);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeCard);
    this._imageCard.addEventListener('click', this._handleOpenPhoto);
    this._deleteButton.addEventListener('click', this._handleDeleteCard);
}

  _getLikesCount() {
    this._likes.forEach(el => {
      if (el._id === this._myId) {
        this._isLiked = true;
        this._likeButton.classList.add('gallery__button-like_active');
        return
      }
    })
    this._counter.textContent = this._likesLength;
  }

  toggleLike(like) {
    this._likeButton.classList.toggle('gallery__button-like_active');
    this._counter.textContent = like.length;
    if (this._isLiked) {
      this._isLiked = false;
    } else {
      this._isLiked = true;
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._title = this._element.querySelector('.gallery__title')
    this._likeButton = this._element.querySelector('.gallery__button-like');
    this._imageCard = this._element.querySelector('.gallery__photo');
    this._deleteButton = this._element.querySelector('.gallery__button-delete');
    this._counter = this._element.querySelector('.gallery__button-like-counter');

    this._imageCard.src = this._cardData.link;
    this._imageCard.alt = this._cardData.name;
    this._title.textContent = this._cardData.name;

    this._myId === this._ownerId ? this._deleteButton.style.display = 'block' : this._deleteButton.style.display = 'none';

    this._getLikesCount();
    this._setEventListeners();
    return this._element;
  }
}
