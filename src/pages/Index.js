import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import { initialCards, settings } from "../utils/Constants.js";
import Api from "../components/Api.js";
import ModalWithConfirm from "../components/ModalWithConfirm.js";

// PROFILE EDIT MODAL
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditForm = document.forms["profile-modal-form"];
const modalTitleInput = document.querySelector("#modal-title-input");
const modalDescriptionInput = document.querySelector(
  "#modal-description-input"
);

// AVATAR
const profileAvatarContainer = document.querySelector(
  ".profile__image-overlay"
);
const editProfileSaveButton = document.querySelector(
  "#edit-profile-modal-save-button"
);

// NEW CARD MODAL
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["modal-add-form"];
const addCardButton = document.querySelector("#profile-add-button");
const cardSelector = "#card-template";

// FORMS
const forms = document.querySelectorAll(settings.formSelector);

/*                                       */
/*                Api.JS                 */
/*                                       */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5f4ef148-bee1-40be-bb22-88d989208c73",
    "Content-Type": "application/json",
  },
});

/*                                       */
/*                Cards                  */
/*                                       */

function createCard(cardData) {
  const addCard = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );
  return addCard.getView();
}

let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      { items: initialCards, settings, renderer: createCard },
      ".cards__list"
    );
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

/*                                       */
/*          FormValidator.js             */
/*                                       */

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formEl) => {
    const validator = new FormValidator(settings, formEl);
    const formName = formEl.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

/*                                       */
/*           ModalWithForm               */
/*                                       */

const cardModal = new ModalWithForm("#add-card-modal", handleAddCardSubmit);

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

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({name: res.name, description: res.about});
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });


const userInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  avatarSelector: ".profile__avatar",
});

/*                                       */
/*           ProfileEditModal            */
/*                                       */

const editModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

editModal.setEventListeners();

function handleProfileEditSubmit(formData) {
  editModal.renderLoading(true);
  api
    .updateProfileInfo({ name: formData.title, about: formData.description })
    .then(() => {
      userInfo.setUserInfo({
        name: formData.title,
        description: formData.description,
      });
      editModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModal.renderLoading(false);
    });
}

/*                                       */
/*              avatar                   */
/*                                       */

function handleAvatarSubmit(data) {
  editAvatarModal.renderLoading(true);
  api
    .updateAvatar({ avatar: data.link })
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      editAvatarModal.close();
    })
    .catch((err) => {
      console.error("Failed to update user avatar:", err);
    })
    .finally(() => {
      editAvatarModal.renderLoading(false);
    });
}

const editAvatarModal = new ModalWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);
editAvatarModal.setEventListeners();

profileAvatarContainer.addEventListener("click", () => {
  editAvatarModal.open();
});

/*                                       */
/*          LIKE & DISLIKE               */
/*                                       */

function handleLikeClick(card) {
  if (card.getIsLiked()) {
    api
      .removeLike(card.getId)
      .then(() => {
        card.setIsLiked(true);
        console.log(`Added like from card ID: ${card.getId()}`); 
      })
      .catch(console.error);
  } else {
    api
      .addLike(card.getId)
      .then(() => {
        card.setIsLiked(false);
        console.log(`Removed like from card ID: ${card.getId()}`); 

      })
      .catch(console.error);
  }
}

function handleImageClick(name, link) {
  modalWithImage.open(name, link);
}

/*                                       */
/*              ADD CARD                 */
/*                                       */

function handleAddCardSubmit(data) {
  const name = data.title;
  const link = data.link;
  cardModal.renderLoading(true);
  api
    .createNewCard({ name, link })
    .then((res) => {
      const cardElement = createCard(res);
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
/*            DELETE CARD                */
/*                                       */

const confirmDeleteModal = new ModalWithConfirm("#delete-modal");
confirmDeleteModal.setEventListeners();

function handleDeleteClick(cardData) {
  confirmDeleteModal.open();
  confirmDeleteModal.handleDelete(() => {
    console.log("Loading...");
    api
      .deleteCard(cardData._id)
      .then(() => {
        console.log("Card deleted successfully");
        cardData.handleDeleteCard();
        console.log(`Deleted card with ID: ${cardData._id}`);
        confirmDeleteModal.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        confirmDeleteModal.renderLoading(false);
      });
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
