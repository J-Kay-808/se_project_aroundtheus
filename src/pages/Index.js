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
    handleLikeCard,
    handleDislikeCard,
    handleDeleteCard
  );
  return addCard.getView();
}

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cards.forEach((card) => {
      cardSection.addItem(createCard(card));
    });
  })
  .catch((err) => {
    console.error(err);
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
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
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
  // "#edit-profile-modal-save-button",
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
        avatar: userInfo.getUserInfo().avatar,
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

const handleAvatarSubmit = ({ link: avatar }) => {
  console.log(avatar);
  editAvatarModal.renderLoading(true);
  api
    .updateAvatar(avatar)
    .then((res) => {
      userInfo.updateAvatar(res.avatar);
      formValidators["edit-avatar-form"].disableButton();
      formValidators["edit-avatar-form"].resetForms();
      editAvatarModal.close();
    })
    .catch((err) => {
      console.error("Failed to update user avatar:", err);
    })
    .finally(() => {
      editAvatarModal.renderLoading(false);
    });
};

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

function handleLikeCard(card) {
  api
    .addLike(card.getCardId())
    .then(() => {
      card.like();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDislikeCard(card) {
  api
    .removeLike(card.getCardId())
    .then(() => {
      card.dislike();
    })
    .catch((err) => {
      console.error(err);
    });
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

const deleteCardModal = new ModalWithForm("#delete-modal");
deleteCardModal.setEventListeners();

function handleDeleteCard(card) {
  deleteCardModal.open();
  deleteCardModal.setSubmit(() => {
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        console.log("Card deleted successfully");
        card.removeCard();
        deleteCardModal.close();
        card.handleDeleteButton();
      })
      .catch((error) => {
        console
          .error("Error deleting card:", error)
          .finally(() => confirmation.setSubmitText(false));
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
