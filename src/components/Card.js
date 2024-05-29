export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteButton,
    handleLikeButton) {
    this.name = data.name;
    this.link = data.link; 
    this._id = data._id; 
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeButton = handleLikeButton;
  } 

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.handleLikeIcon(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteIcon(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({name: this.name, link: this.link});
    });
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }


  _handleDeleteIcon (){
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

    this._cardImageEl.src = this.link;
    this._cardImageEl.alt = this.name;
    this._cardTitleEl.textContent = this.name;

    this._setEventListeners();

    this._renderLikes();
    return this._cardElement;
  }
}
