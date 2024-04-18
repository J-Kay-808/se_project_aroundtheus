export default class FormValidator {
  constructor(settings, formEl) {
    this._formSelector = settings.formSelector
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }


  _hideInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return !this._inputEls.some((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls.forEach((_inputEl) => {
      _inputEl.addEventListener("input", () => {
        this._checkInputValidity(_inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((_inputEl) => {
      this._hideInputError(_inputEl);
    });
    this.disableButton();
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.disableButton();
    });

    this._setEventListeners();
    this._toggleButtonState();
  }

  //  BUTTONS

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    }else {
    this._enableButton();
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}
