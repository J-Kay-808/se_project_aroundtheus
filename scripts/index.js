const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*                                       */
/*                   Elements            */
/*                                       */

// PROFILE EDIT MODAL

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseBtn = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileFormElement = profileEditModal.querySelector("#modal-edit-form");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const modalTitleInput = document.querySelector("#modal-title-input");
const modalDescriptionInput = document.querySelector(
  "#modal-description-input"
);

// NEW CARD MODAL
const addCardModal = document.querySelector("#add-card-modal");
const addCardElement = addCardModal.querySelector("#add-card-form");
const addCardBtn = document.querySelector("#profile-add-button");
const addCardCloseBtn = addCardModal.querySelector("#modal-close-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

//

const profileEditForm = document.forms["modal-form"];

const cardWrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*                                       */
/*             Functions                 */
/*                                       */

function renderCard(cardData, cardWrap) {
  const cardElement = getCardElement(cardData);
  cardWrap.prepend(cardElement);
}

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");
}

//

function getCardElement(Data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = Data.link;
  cardImageEl.alt = Data.name;
  cardTitleEl.textContent = Data.name;

  return cardElement;
}

/*                                       */
/*             Event Handlers            */
/*                                       */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closePopup();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardWrap);
  closePopup(addCardModal);
}

/*                                       */
/*             Event Listeners           */
/*                                       */

profileEditBtn.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
});

addCardBtn.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

profileEditCloseBtn.addEventListener("click", closePopup);

addCardCloseBtn.addEventListener("click", closePopup);

// FORM LISTENERS

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
