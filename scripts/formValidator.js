export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.modal__input,
    this._submitButtonSelector = settings.modal__button,
    this._inactiveButtonClass = settings.modal__button_disabled,
    this._inputErrorClass = settings.modal__input_type_error,
    this._errorClass = settings.modal__error_visible,
    this._form = formEl;
  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }




  _hideInputError(formEl, inputEl, settings) {
    errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
}




  _toggleButtonState() {
    if (this._hasInvalidInput(inputEls)) {
      this._FormValidatorsubmitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }




  _checkInputValidity(form, inputEl, settings) {
    if (!inputEl.validity.valid) {
        return showInputError(this._form, inputEl, settings);
      }
  }  




  _hasInvalidInput() {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this.inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, _inputEl, settings);
        toggleButtonState(inputEls, submitButton, settings);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners(formEl, settings);
  }
}



