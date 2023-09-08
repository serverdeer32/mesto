import Popup from "./Popup.js"

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');

    this._submitButton = this._form.querySelector('.popup__button');
    this._defaultButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `Удаление...`
      this._submit({ card: this._element, cardId: this._cardId });
    })
  }

  resetButtonText() {
    this._submitButton.textContent = this._defaultButtonText;
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }
}

