import Modal from "./Modal";

export default class ModalWithConfirm extends Modal {
  constructor(modalSelector) {
    super({modalSelector});
    this._form = this._modalElement.querySelector(".modal__form");
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

  renderLoading(isSaving) {
    if (isSaving) {
      this._modalButton.textContent = "Saving...";
    } else {
      this._modalButton.textContent = "Save";
    }
  }

}