import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__photo-title');
    this._image = this._popup.querySelector('.popup__photo-source');
  }

  open = (cardData) => {
    this._image.src = cardData.link;
    this._title.textContent = cardData.name;
    this._image.alt = cardData.name;
    super.open();
  }
}
