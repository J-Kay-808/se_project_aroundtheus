export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({name: this._name, link: this._link});
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".card").cloneNode(true);
    
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._deleteButton = this._cardElement.querySelector(".delete__button");
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
