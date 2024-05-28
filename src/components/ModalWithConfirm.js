import Modal from "./Modal.js";
export default class ModalWithConfirm extends Modal {
  constructor(ModalSelector) {
    super(ModalSelector);
    this._affirmButton = this._modalElement.querySelector(".modal__button");

  }

  setSubmit(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    this._affirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
