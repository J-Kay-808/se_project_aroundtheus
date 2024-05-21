import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import { initialCards, settings } from "../utils/Constants.js";
import Api from "../components/Api.js";

// PROFILE EDIT MODAL
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-modal-form"];
const modalTitleInput = document.querySelector("#modal-title-input");
const modalDescriptionInput = document.querySelector(
  "#modal-description-input"
);

// NEW CARD MODAL
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["modal-add-form"];
const addCardButton = document.querySelector("#profile-add-button");

const cardSelector = "#card-template";

//Api.js

/*                                       */
/*                Api.JS                 */
/*                                       */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ac6a4a1f-f0eb-49da-ad65-e54f994d4e83",
    "Content-Type": "application/json",
  },
});

/*                                       */
/*          FormValidator.js             */
/*                                       */

const forms = document.querySelectorAll(settings.formSelector);

forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidator.enableValidation();
});

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
  avatarSelector: ".profile__avatar",
});

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setAvatar(res.avatar);
});

/*                                       */
/*             functions                 */
/*                                       */

function createCard(cardData) {
  const addCard = new Card(cardData, cardSelector, handleImageClick);
  return addCard.getView();
}

api.getInitialCards().then((cards) => {
  console.log(cards);
  cards.forEach((card) => {
    cardSection.addItem(createCard(card));
  });
});

const cardSection = new Section(
  {
    items: initialCards,
    settings,
    renderer: createCard,
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


function handleProfileEditSubmit(data) {
  userInfo.setUserInfo({ name: data.title, description: data.description });
  editModal.close();
}

function handleAddCardSubmit(data) {
  const name = data.title;
  const link = data.link;
  cardModal.renderLoading(true);
  api
    .createNewCard({name, link})
    .then((user) => {
      const cardElement = createCard(user);
      cardSection.addItem(cardElement);
      cardModal.close();
      addCardForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardModal.renderLoading(false);
    });
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

