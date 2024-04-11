import "../pages/index.css";

import Modal from "../components/Modal.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import { initialCards } from "../utils/Constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-modal-form"];
const profileEditCloseButton =
  profileEditModal.querySelector("#edit-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const modalTitleInput = document.querySelector("#modal-title-input");
const modalDescriptionInput = document.querySelector(
  "#modal-description-input"
);

// NEW CARD MODAL

const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["modal-add-form"];
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


const cardWrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardSelector = "#card-template";

/*                                       */
/*          FormValidator.js             */
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
/*           ModalWithForm               */
/*                                       */

const editModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const cardModal = new ModalWithForm("#add-card-modal", handleAddCardSubmit);

editModal.setEventListeners();
cardModal.setEventListeners();

addCardButton.addEventListener("click", () => {
  cardModal.open();
});

/*                                       */
/*          ModalWithImage               */
/*                                       */

const modalWithImage = new ModalWithImage("#image-modal");
modalWithImage.setEventListeners();

/*                                       */
/*             UserInfo                  */
/*                                       */

const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
});

/*                                       */
/*             card.js                   */
/*                                       */

function renderCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    validationSettings,
    renderer: renderCard,
  },

  ".cards__list"
);

cardSection.renderItems();

/*                                       */
/*             Event Handlers            */
/*                                       */

function handleImageClick(name, link) {
  modalWithImage.open(name, link);
}

function handleProfileEditSubmit({ name, description }) {
  userInfo.setUserInfo({ name, description });
  editModal.close();
}

function handleAddCardSubmit({ title, url }) {
  const card = renderCard({ name: title, link: url });
  cardSection.addItem(card);
  cardModal.close();
  addCardForm.reset();
}

/*                                       */
/*             Event Listeners           */
/*                                       */

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  modalTitleInput.value = currentUserInfo.name;
  modalDescriptionInput.value = currentUserInfo.description;
  editModal.open();
});

initialCards.forEach((cardData) => renderCard(cardData, cardWrap));
