import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
  }

  open(cardData) {
    this._description = this._modalElement.querySelector(".image__description");
    this._image = this._modalElement.querySelector(".image__modal");

    this._description.textContent = cardData.name;
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    super.open();
  }
}
