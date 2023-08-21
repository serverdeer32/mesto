export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._form = form;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(errorTextElement, input) {
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(this._errorClass);
  }

  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(this._errorClass);
  }

  _isValid(input) {
    const errorTextElement = this._form.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(errorTextElement, input);
    } else {
      this._hideInputError(errorTextElement, input);
    }
  }

  _setEventListener() {
    this._toggleButtonState();

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  _disableButton() {
    this._button.setAttribute('disabled', true);
  }

  _enableButton() {
    this._button.removeAttribute('disabled', true);
  }

  _hasInvalidInput() {
    return this._arrayInputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  enableValidation() {
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._arrayInputList = Array.from(this._inputList);
    this._setEventListener();
  }

  resetValidation() {
    this._disableButton();

    this._inputList.forEach((input) => {
      const errorTextElement = this._form.querySelector(`#${input.id}-error`);
      this._hideInputError(errorTextElement, input);
    });
  }
}

