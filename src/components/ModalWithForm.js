import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._form = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputEls = this._modalElement.querySelectorAll(".modal__form-input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputEls.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }


  open() {
    super.open();
  }

  close() {
    super.close();
    console.log(this._form);
    this._form.reset();
  }
}
