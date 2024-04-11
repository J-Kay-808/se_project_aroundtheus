export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this.close = this.close.bind(this)
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleClickOverlay);
    this._closeButton.addEventListener("click", this.close);

  }

  close() {
    this._modalElement.classList.add("modal__close");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleClickOverlay);
    this._closeButton.removeEventListener("click", this.close);

  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleClickOverlay = (e) => {
    if (e.target.classList.contains(".modal")) {
      this.close();
    }
  };

  setEventListeners() {
    this._modalElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (e.target.classList.contains(".modal__close")) {
        this.close();
      }
    });
  }
}
