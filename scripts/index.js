import Card from "./card.js";
import FormValidator from "./FORMVAILDATOR.js";

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
const addCardForm = document.forms["modal-form"];
const addCardButton = document.querySelector("#profile-add-button");
const addCardCloseButton = addCardModal.querySelector("#add-close-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");

// IMAGE MODAL

const imageModal = document.querySelector("#image-modal");
const cardImageModal = document.querySelector("#image__modal");
const imageDescriptionModal = document.querySelector("#image-description");
const imageCloseButton = imageModal.querySelector("#image-close-button");
const imageModalPrevieWLink = imageModal.querySelector(
  "modal__container-image"
);

const modals = document.querySelectorAll(".modal");

const profileEditForm = document.forms["profile-modal-form"];

const cardWrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardSelector = "#card-template";

/*                                       */
/*                Validation             */
/*                                       */

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*                                       */
/*             Functions                 */
/*                                       */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleClickOverlay() {
  modals.forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target === modal) {
        closeModal(modal);
      }
    });
  });
}

handleClickOverlay();

/*                                       */
/*             card.js                   */
/*                                       */

function renderCard(cardData, cardWrap) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  cardWrap.prepend(card.getView());
}

function handleImageClick(cardData) {
  openModal(imageModal);
  cardImageModal.src = cardData.link;
  cardImageModal.alt = cardData.name;
  imageDescriptionModal.textContent = cardData.name;
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
  addCardForm.reset();
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
});


profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

// FORM LISTENERS

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
