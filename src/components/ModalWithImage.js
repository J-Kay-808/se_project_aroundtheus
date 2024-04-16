import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
  }

  open(data) {
    this._description = this._modalElement.querySelector(".image__description");
    this._image = this._modalElement.querySelector(".image__modal");

    this._description.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
