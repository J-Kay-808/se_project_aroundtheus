import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._form = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = this._modalElement.querySelectorAll(".modal__form-input");
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputEls.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
  }

  open() {
    super.open();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._form.removeEventListener("submit", this._handleSubmit);
    this._form.reset();
  }
}
