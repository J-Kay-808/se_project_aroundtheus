import Modal from "./Modal";

export default class ModalWithConfirm extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._form = this._modalElement.querySelector(".modal__form");
    this._modalButton = this._modalElement.querySelector(".modal__button");
    this._inputEl = this._modalElement.querySelectorAll(".modal__form-input");
    
  }

  handleDelete(action) {
    this._handleDeleted = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleted();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Loading...";
    } else {
      this._modalButton.textContent = "YES";
    }
  }
}
