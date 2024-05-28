import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._form = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEl = this._modalElement.querySelectorAll(".modal__form-input");
    this._modalButton = this._modalElement.querySelector(".modal__button");
    this._modalBtnText = this._modalButton.textContent;
  }

  _getInputValues() {
    this.inputValues = {};
    this._inputEl.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }


  renderLoading(isSaving) {
    if (isSaving) {
      this._modalButton.textContent = "Saving...";
    } else {
      this._modalButton.textContent = "Save";
    }
  }

  setSubmit(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
  }


  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit( this._getInputValues());
    });
    super.setEventListeners();

  }

}
 