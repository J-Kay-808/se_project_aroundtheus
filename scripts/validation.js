// // enabling validation by calling enableValidation()
// // pass all the settings on call

// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, config) {
//   if (!inputEl.validity.valid) {
//     return showInputError(formEl, inputEl, config);
//   }
//   hideInputError(formEl, inputEl, config);
// }

// function hasInvalidInput(inputEls) {
//   return !inputEls.every((inputEl) => inputEl.validity.valid);
// }

// //dislikeButton
// function disableButton(submitButton, { inactiveButtonClass }) {
//   submitButton.classList.add(inactiveButtonClass);
//   submitButton.disabled = true;
//   console.log(disableButton);
// }

// //enableButton
// function enableButton(submitButton, { inactiveButtonClass }) {
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
//   if (hasInvalidInput(inputEls)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function setEventListeners(formEl, config) {
//   const { inputSelector, submitButtonSelector } = config;
//   const inputEls = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(submitButtonSelector);
//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", (e) => {
//       checkInputValidity(formEl, inputEl, config);
//       toggleButtonState(inputEls, submitButton, config);
//     });
//   });
// }

// function enableValidation(config) {
//   const formEls = [...document.querySelectorAll(config.formSelector)];
//   formEls.forEach((formEl) => {
//     formEl.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });

//     setEventListeners(formEl, config);
//   });
// }

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(settings);
