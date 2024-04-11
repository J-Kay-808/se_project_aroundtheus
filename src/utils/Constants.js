export const variables = {
  // PROFILE EDIT MODAL
  profileEditCloseButton: profileEditModal.querySelector("#edit-close-button"),
  profileTitle: document.querySelector("#profile-title"),
  profileDescription: document.querySelector("#profile-description"),
  profileEditModal: document.querySelector("#profile-edit-modal"),

  // NEW CARD MODAL
  addCardCloseButton: addCardModal.querySelector("#add-close-button"),
  cardTitleInput: document.querySelector("#card-title-input"),
  cardUrlInput: document.querySelector("#card-url-input"),
  addCardModal: document.querySelector("#add-card-modal"),

  // IMAGE MODAL

  imageModal: document.querySelector("#image-modal"),
  cardImageModal: document.querySelector("#image__modal"),
  imageDescriptionModal: document.querySelector("#image-description"),
  imageCloseButton: imageModal.querySelector("#image-close-button"),
  imageModalPrevieWLink: imageModal.querySelector("modal__container-image"),

  modals: document.querySelectorAll(".modal"),
};

export const initialCards = [
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
