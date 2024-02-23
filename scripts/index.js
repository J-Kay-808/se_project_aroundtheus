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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton =
  profileEditModal.querySelector("#edit-close-button");
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
const addCardButton = document.querySelector("#profile-add-button");
const addCardCloseButton = addCardModal.querySelector("#add-close-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

// IMAGE MODAL

const imageModal = document.querySelector("#image-modal");
const cardImage = document.querySelectorAll("#add-card-modal");
const cardImageModal = document.querySelector("#image__modal");
const imageDescriptionModal = document.querySelector("#image-description");
const imageCloseButton = imageModal.querySelector("#image-close-button");

const closeButton = document.querySelectorAll(".modal__close");
// const modal = document.querySelectorAll(".modal")

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

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".delete__button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(imageModal);
    cardImageModal.src = cardData.link;
    cardImageModal.alt = cardData.name;
    imageDescriptionModal.textContent = cardData.name;
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*                                       */
/*             Event Handlers            */
/*                                       */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardWrap);
  closeModal(addCardModal);
}

/*                                       */
/*             Event Listeners           */
/*                                       */

profileEditButton.addEventListener("click", () => {
  modalTitleInput.value = profileTitle.textContent;
  modalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardElement.reset();
});

profileEditCloseButton.addEventListener("click", closeModal);

addCardCloseButton.addEventListener("click", closeModal);

imageCloseButton.addEventListener("click", closeModal);

// FORM LISTENERS

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardElement.addEventListener("submit", handleAddCardSubmit);

closeButton.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
