import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._submitButton = this._form.querySelector('.popup__button');
    this._defaultButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(inputValues) {
    this._inputList.forEach(input => {
      input.value = inputValues[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitButton.textContent = `Сохранение...`
      this._submit(this._getInputValues());
    })
  }

  resetButtonText() {
    this._submitButton.textContent = this._defaultButtonText;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }
}
