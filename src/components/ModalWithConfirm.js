import Modal from "./Modal";

export default class ModalWithConfirm extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._form = this._modalElement.querySelector(".modal__form");
    this._modalButton = this._modalElement.querySelector(".modal__button");
  }

  handleDelete(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
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
