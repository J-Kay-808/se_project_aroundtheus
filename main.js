!function(){"use strict";class e{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handleImageClick=s}_setEventListeners(){this._likeButton.addEventListener("click",(()=>{this._handleLikeIcon()})),this._deleteButton.addEventListener("click",(()=>{this._handleDeleteCard()})),this._cardImageEl.addEventListener("click",(()=>{this._handleImageClick({name:this._name,link:this._link})}))}_handleLikeIcon(){this._likeButton.classList.toggle("card__like-button_active")}_handleDeleteCard(){this._cardElement.remove(),this._cardElement=null}getView(){return this._cardElement=document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0),this._cardImageEl=this._cardElement.querySelector(".card__image"),this._cardTitleEl=this._cardElement.querySelector(".card__title"),this._deleteButton=this._cardElement.querySelector(".delete__button"),this._likeButton=this._cardElement.querySelector(".card__like-button"),this._cardImageEl.src=this._link,this._cardImageEl.alt=this._name,this._cardTitleEl.textContent=this._name,this._setEventListeners(),this._cardElement}}class t{constructor(e,t){this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._form=t,this._inputEls=[...this._form.querySelectorAll(this._inputSelector)],this._submitButton=this._form.querySelector(this._submitButtonSelector)}_showInputError(e){this._errorMessageEl=this._form.querySelector(`#${e.id}-error`),e.classList.add(this._inputErrorClass),this._errorMessageEl.textContent=e.validationMessage,this._errorMessageEl.classList.add(this._errorClass)}_hideInputError(e){this._errorMessageEl=this._form.querySelector(`#${e.id}-error`),e.classList.remove(this._inputErrorClass),this._errorMessageEl.textContent="",this._errorMessageEl.classList.remove(this._errorClass)}_checkInputValidity(e){if(!e.validity.valid)return this._showInputError(e);this._hideInputError(e)}_hasInvalidInput(){return this._inputEls.some((e=>!e.validity.valid))}_setEventListeners(){this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}resetValidation(){this._inputEls.forEach((e=>{this._hideInputError(e)})),this.disableButton()}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault(),this.disableButton()})),this._setEventListeners(),this._toggleButtonState()}_toggleButtonState(){this._hasInvalidInput()?this.disableButton():this._enableButton()}disableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}_enableButton(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}}class s{constructor(e){let{modalSelector:t}=e;this._modalElement=document.querySelector(t),this._closeButton=this._modalElement.querySelector(".modal__close"),this.close=this.close.bind(this)}open(){this._modalElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose),document.addEventListener("mousedown",this._handleClickOverlay)}close(){this._modalElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose),document.removeEventListener("mousedown",this._handleClickOverlay)}_handleEscClose=e=>{"Escape"===e.key&&this.close()};_handleClickOverlay=e=>{e.target.classList.contains("modal")&&this.close()};setEventListeners(){this._closeButton.addEventListener("click",(()=>{this.close()}))}}class i extends s{constructor(e,t){super({modalSelector:e}),this._form=this._modalElement.querySelector(".modal__form"),this._handleFormSubmit=t,this._inputEl=this._modalElement.querySelectorAll(".modal__form-input")}_getInputValues(){return this._inputValues={},this._inputEl.forEach((e=>{this._inputValues[e.name]=e.value})),this._inputValues}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this._form.reset(),this.close()}))}}class n{constructor(e){let{profileTitle:t,profileDescription:s}=e;this._name=document.querySelector(t),this._description=document.querySelector(s)}getUserInfo(){return this._userData={name:this._name.textContent,description:this._description.textContent},this._userData}setUserInfo(e){let{name:t,description:s}=e;this._name.textContent=t,this._description.textContent=s}}const r={formSelector:".modal__form",inputSelector:".modal__form-input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},o=(document.querySelector("#profile-title"),document.querySelector("#profile-description"),document.querySelector("#profile-edit-button")),l=(document.forms["profile-modal-form"],document.querySelector("#modal-title-input")),a=document.querySelector("#modal-description-input"),c=(document.querySelector("#card-title-input"),document.querySelector("#card-url-input"),document.querySelector("#add-card-modal"),document.forms["modal-add-form"],document.querySelector("#profile-add-button"));document.querySelectorAll(r.formSelector).forEach((e=>{new t(r,e).enableValidation()}));const d=new i("#profile-edit-modal",(function(e){_.setUserInfo({name:e.title,description:e.description}),d.close()})),u=new i("#add-card-modal",(function(e){const t=h({name:e.title,link:e.link});p.addItem(t),u.close()}));d.setEventListeners(),u.setEventListeners(),c.addEventListener("click",(()=>{u.open()}));const m=new class extends s{constructor(e){super({modalSelector:e})}open(e){this._description=this._modalElement.querySelector(".image__description"),this._image=this._modalElement.querySelector(".image__modal"),this._description.textContent=e.name,this._image.src=e.link,this._image.alt=e.name,super.open()}}("#image-modal");m.setEventListeners();const _=new n({profileTitle:".profile__title",profileDescription:".profile__description"});function h(t){return new e(t,"#card-template",E).getView()}const p=new class{constructor(e,t){let{items:s,renderer:i}=e;this._items=s,this._renderer=i,this._container=document.querySelector(t)}renderItems(){this._items.forEach((e=>{const t=this._renderer(e);this._container.append(t)}))}addItem(e){this._container.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],settings:r,renderer:h},".cards__list");function E(e,t){m.open(e,t)}p.renderItems(),new n("#modal-title-input","#modal-description-input"),o.addEventListener("click",(()=>{const e=_.getUserInfo();l.value=e.name,a.value=e.description,d.open()}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q05FLEtBQU0sc0dBR1IsQ0FDRUYsS0FBTSxjQUNORSxLQUFNLHlHQUdSLENBQ0VGLEtBQU0saUJBQ05FLEtBQU0sNEdBR1IsQ0FDRUYsS0FBTSxVQUNORSxLQUFNLHFHQUVSLENBQ0VGLEtBQU0sd0JBQ05FLEtBQU0scUdBRVIsQ0FDRUYsS0FBTSxpQkFDTkUsS0FBTSxtR0MyRE53QixTQUFRLEVBQ1I0RixTQUFVUixHQUdaLGdCQVNGLFNBQVNqSCxFQUFpQkcsRUFBTUUsR0FDOUIrRyxFQUFleEMsS0FBS3pFLEVBQU1FLEVBQzVCLENBUkE2RyxFQUFZVyxjQVVDLElBQUloQyxFQUFTLHFCQUFzQiw0QkFtQmhEUyxFQUFrQjVGLGlCQUFpQixTQUFTLEtBQzFDLE1BQU15SCxFQUFrQnRCLEVBQVNaLGNBQ2pDTSxFQUFnQlosTUFBUXdDLEVBQWdCaEksS0FDeENzRyxFQUFzQmQsTUFBUXdDLEVBQWdCaEMsWUFDOUNTLEVBQVVoQyxNQUFNLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvTW9kYWxXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvdXRpbHMvQ29uc3RhbnRzLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Nb2RhbFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaykge1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2xpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5faGFuZGxlTGlrZUljb24oKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNhcmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2NhcmRJbWFnZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2soe25hbWU6IHRoaXMuX25hbWUsIGxpbms6IHRoaXMuX2xpbmt9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUxpa2VJY29uKCkge1xyXG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZURlbGV0ZUNhcmQoKSB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFZpZXcoKSB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50XHJcbiAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXHJcbiAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIikuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgXHJcbiAgICB0aGlzLl9jYXJkSW1hZ2VFbCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXJkVGl0bGVFbCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XHJcbiAgICB0aGlzLl9kZWxldGVCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlbGV0ZV9fYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5fbGlrZUJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XHJcblxyXG4gICAgdGhpcy5fY2FyZEltYWdlRWwuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2NhcmRJbWFnZUVsLmFsdCA9IHRoaXMuX25hbWU7XHJcbiAgICB0aGlzLl9jYXJkVGl0bGVFbC50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XHJcblxyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbCkge1xyXG4gICAgdGhpcy5fZm9ybVNlbGVjdG9yID0gc2V0dGluZ3MuZm9ybVNlbGVjdG9yO1xyXG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IHNldHRpbmdzLmlucHV0U2VsZWN0b3I7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IHNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xyXG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IHNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBzZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gc2V0dGluZ3MuZXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Zvcm0gPSBmb3JtRWw7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IFsuLi50aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvcildO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICB0aGlzLl9lcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgdGhpcy5fZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCkge1xyXG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnB1dEVscy5zb21lKChpbnB1dEVsKSA9PiAhaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChfaW5wdXRFbCkgPT4ge1xyXG4gICAgICBfaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShfaW5wdXRFbCk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKF9pbnB1dEVsKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKF9pbnB1dEVsKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5kaXNhYmxlQnV0dG9uKCk7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5kaXNhYmxlQnV0dG9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8vICBCVVRUT05TXHJcblxyXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLl9oYXNJbnZhbGlkSW5wdXQoKSkge1xyXG4gICAgICB0aGlzLmRpc2FibGVCdXR0b24oKTtcclxuICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgdGhpcy5fZW5hYmxlQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgX2VuYWJsZUJ1dHRvbigpIHtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsIHtcclxuICBjb25zdHJ1Y3Rvcih7IG1vZGFsU2VsZWN0b3IgfSkge1xyXG4gICAgdGhpcy5fbW9kYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb2RhbFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2Nsb3NlQnV0dG9uID0gdGhpcy5fbW9kYWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Nsb3NlXCIpO1xyXG4gICAgdGhpcy5jbG9zZSA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICB0aGlzLl9tb2RhbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5faGFuZGxlQ2xpY2tPdmVybGF5KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgdGhpcy5fbW9kYWxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuX2hhbmRsZUNsaWNrT3ZlcmxheSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlRXNjQ2xvc2UgPSAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBfaGFuZGxlQ2xpY2tPdmVybGF5ID0gKGUpID0+IHtcclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IE1vZGFsIGZyb20gXCIuL01vZGFsLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbFdpdGhGb3JtIGV4dGVuZHMgTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKG1vZGFsU2VsZWN0b3IsIGhhbmRsZUZvcm1TdWJtaXQpIHtcclxuICAgIHN1cGVyKHsgbW9kYWxTZWxlY3RvciB9KTtcclxuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9tb2RhbEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fZm9ybVwiKTtcclxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xyXG4gICAgdGhpcy5faW5wdXRFbCA9IHRoaXMuX21vZGFsRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19mb3JtLWlucHV0XCIpO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgdGhpcy5faW5wdXRWYWx1ZXMgPSB7fTtcclxuICAgIHRoaXMuX2lucHV0RWwuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgdGhpcy5faW5wdXRWYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VmFsdWVzO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIGNsb3NlKCkge1xyXG4gIC8vICAgdGhpcy5fZm9ybS5yZXNldCgpO1xyXG4gIC8vICAgc3VwZXIuY2xvc2UoKTtcclxuICAvLyB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KCB0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcclxuICAgICAgdGhpcy5fZm9ybS5yZXNldCgpO1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuICIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih7IHByb2ZpbGVUaXRsZSwgcHJvZmlsZURlc2NyaXB0aW9uIH0pIHtcclxuICAgIHRoaXMuX25hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHByb2ZpbGVUaXRsZSk7XHJcbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocHJvZmlsZURlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgdGhpcy5fdXNlckRhdGEgPSB7XHJcbiAgICAgIG5hbWU6IHRoaXMuX25hbWUudGV4dENvbnRlbnQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLl9kZXNjcmlwdGlvbi50ZXh0Q29udGVudCxcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl91c2VyRGF0YVxyXG4gIH1cclxuXHJcbiAgc2V0VXNlckluZm8oeyBuYW1lLCBkZXNjcmlwdGlvbiB9KSB7XHJcbiAgICB0aGlzLl9uYW1lLnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgIHRoaXMuX2Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XHJcbiAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWtlIExvdWlzZVwiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG5cclxuICB7XHJcbiAgICBuYW1lOiBcIkxhdGVtYXJcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhZ28uanBnXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXR0aW5ncyA9IHtcclxuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2Zvcm0taW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX2J1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxyXG4gIGlucHV0RXJyb3JDbGFzczogXCJtb2RhbF9faW5wdXRfdHlwZV9lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcclxufTtcclxuIiwiaW1wb3J0IFwiLi4vcGFnZXMvaW5kZXguY3NzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBNb2RhbFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL01vZGFsV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBNb2RhbFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Nb2RhbFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgeyBpbml0aWFsQ2FyZHMsIHNldHRpbmdzIH0gZnJvbSBcIi4uL3V0aWxzL0NvbnN0YW50cy5qc1wiO1xyXG5cclxuLy8gUFJPRklMRSBFRElUIE1PREFMXHJcbmNvbnN0IHByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS10aXRsZVwiKTtcclxuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWRlc2NyaXB0aW9uXCIpO1xyXG5jb25zdCBwcm9maWxlRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0LWJ1dHRvblwiKTtcclxuY29uc3QgcHJvZmlsZUVkaXRGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJwcm9maWxlLW1vZGFsLWZvcm1cIl07XHJcbmNvbnN0IG1vZGFsVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtdGl0bGUtaW5wdXRcIik7XHJcbmNvbnN0IG1vZGFsRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgXCIjbW9kYWwtZGVzY3JpcHRpb24taW5wdXRcIlxyXG4pO1xyXG5cclxuLy8gTkVXIENBUkQgTU9EQUxcclxuY29uc3QgY2FyZFRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcmQtdGl0bGUtaW5wdXRcIik7XHJcbmNvbnN0IGNhcmRVcmxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZC11cmwtaW5wdXRcIik7XHJcbmNvbnN0IGFkZENhcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWNhcmQtbW9kYWxcIik7XHJcbmNvbnN0IGFkZENhcmRGb3JtID0gZG9jdW1lbnQuZm9ybXNbXCJtb2RhbC1hZGQtZm9ybVwiXTtcclxuY29uc3QgYWRkQ2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1hZGQtYnV0dG9uXCIpO1xyXG5cclxuY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xyXG5cclxuLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4vKiAgICAgICAgICBGb3JtVmFsaWRhdG9yLmpzICAgICAgICAgICAgICovXHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbmNvbnN0IGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZXR0aW5ncy5mb3JtU2VsZWN0b3IpO1xyXG5cclxuZm9ybXMuZm9yRWFjaCgoZm9ybSkgPT4ge1xyXG4gIGNvbnN0IGZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihzZXR0aW5ncywgZm9ybSk7XHJcbiAgZm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcbn0pO1xyXG5cclxuLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4vKiAgICAgICAgICAgTW9kYWxXaXRoRm9ybSAgICAgICAgICAgICAgICovXHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuXHJcbmNvbnN0IGVkaXRNb2RhbCA9IG5ldyBNb2RhbFdpdGhGb3JtKFxyXG4gIFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLFxyXG4gIGhhbmRsZVByb2ZpbGVFZGl0U3VibWl0XHJcbik7XHJcblxyXG5jb25zdCBjYXJkTW9kYWwgPSBuZXcgTW9kYWxXaXRoRm9ybShcIiNhZGQtY2FyZC1tb2RhbFwiLCBoYW5kbGVBZGRDYXJkU3VibWl0KTtcclxuXHJcbmVkaXRNb2RhbC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5jYXJkTW9kYWwuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbmFkZENhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBjYXJkTW9kYWwub3BlbigpO1xyXG59KTtcclxuXHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuLyogICAgICAgICAgTW9kYWxXaXRoSW1hZ2UgICAgICAgICAgICAgICAqL1xyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblxyXG5jb25zdCBtb2RhbFdpdGhJbWFnZSA9IG5ldyBNb2RhbFdpdGhJbWFnZShcIiNpbWFnZS1tb2RhbFwiKTtcclxubW9kYWxXaXRoSW1hZ2Uuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuLyogICAgICAgICAgICAgVXNlckluZm8gICAgICAgICAgICAgICAgICAqL1xyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblxyXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgcHJvZmlsZVRpdGxlOiBcIi5wcm9maWxlX190aXRsZVwiLFxyXG4gIHByb2ZpbGVEZXNjcmlwdGlvbjogXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIixcclxufSk7XHJcblxyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbi8qICAgICAgICAgICAgIGNhcmQuanMgICAgICAgICAgICAgICAgICAgKi9cclxuLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ2FyZChjYXJkRGF0YSkge1xyXG4gIGNvbnN0IGFkZENhcmQgPSBuZXcgQ2FyZChjYXJkRGF0YSwgY2FyZFNlbGVjdG9yLCBoYW5kbGVJbWFnZUNsaWNrKTtcclxuICByZXR1cm4gYWRkQ2FyZC5nZXRWaWV3KCk7XHJcbn1cclxuXHJcbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXHJcbiAge1xyXG4gICAgaXRlbXM6IGluaXRpYWxDYXJkcyxcclxuICAgIHNldHRpbmdzLFxyXG4gICAgcmVuZGVyZXI6IHJlbmRlckNhcmQsXHJcbiAgfSxcclxuXHJcbiAgXCIuY2FyZHNfX2xpc3RcIlxyXG4pO1xyXG5cclxuY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuXHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuLyogICAgICAgICAgICAgRXZlbnQgSGFuZGxlcnMgICAgICAgICAgICAqL1xyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblxyXG5mdW5jdGlvbiBoYW5kbGVJbWFnZUNsaWNrKG5hbWUsIGxpbmspIHtcclxuICBtb2RhbFdpdGhJbWFnZS5vcGVuKG5hbWUsIGxpbmspO1xyXG59XHJcblxyXG5jb25zdCB1c2VyID0gbmV3IFVzZXJJbmZvKFwiI21vZGFsLXRpdGxlLWlucHV0XCIsIFwiI21vZGFsLWRlc2NyaXB0aW9uLWlucHV0XCIpO1xyXG5cclxuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZUVkaXRTdWJtaXQoZGF0YSkge1xyXG4gIHVzZXJJbmZvLnNldFVzZXJJbmZvKHsgbmFtZTogZGF0YS50aXRsZSwgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24gfSk7XHJcbiAgZWRpdE1vZGFsLmNsb3NlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQodXNlckluZm8pIHtcclxuICBjb25zdCBuYW1lID0gdXNlckluZm8udGl0bGU7XHJcbiAgY29uc3QgbGluayA9IHVzZXJJbmZvLmxpbms7XHJcbiAgY29uc3QgbmV3Q2FyZCA9IHJlbmRlckNhcmQoeyBuYW1lLCBsaW5rIH0pO1xyXG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW0obmV3Q2FyZCk7XHJcbiAgY2FyZE1vZGFsLmNsb3NlKCk7XHJcbn1cclxuXHJcbi8qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuLyogICAgICAgICAgICAgRXZlbnQgTGlzdGVuZXJzICAgICAgICAgICAqL1xyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblxyXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnN0IGN1cnJlbnRVc2VySW5mbyA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XHJcbiAgbW9kYWxUaXRsZUlucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLm5hbWU7XHJcbiAgbW9kYWxEZXNjcmlwdGlvbklucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLmRlc2NyaXB0aW9uO1xyXG4gIGVkaXRNb2RhbC5vcGVuKCk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgTW9kYWwgZnJvbSBcIi4vTW9kYWwuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGFsV2l0aEltYWdlIGV4dGVuZHMgTW9kYWwge1xyXG4gIGNvbnN0cnVjdG9yKG1vZGFsU2VsZWN0b3IpIHtcclxuICAgIHN1cGVyKHsgbW9kYWxTZWxlY3RvciB9KTtcclxuICB9XHJcblxyXG4gIG9wZW4oZGF0YSkge1xyXG4gICAgdGhpcy5fZGVzY3JpcHRpb24gPSB0aGlzLl9tb2RhbEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbWFnZV9fZGVzY3JpcHRpb25cIik7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX21vZGFsRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmltYWdlX19tb2RhbFwiKTtcclxuXHJcbiAgICB0aGlzLl9kZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2ltYWdlLnNyYyA9IGRhdGEubGluaztcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IGRhdGEubmFtZTtcclxuICAgIHN1cGVyLm9wZW4oKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XHJcbiAgfVxyXG4gIFxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJkRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xyXG4gICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kKGNhcmRFbGVtZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcbiAgXHJcbn1cclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwidGhpcyIsIl9uYW1lIiwibmFtZSIsIl9saW5rIiwibGluayIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlSW1hZ2VDbGljayIsIl9zZXRFdmVudExpc3RlbmVycyIsIl9saWtlQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVMaWtlSWNvbiIsIl9kZWxldGVCdXR0b24iLCJfaGFuZGxlRGVsZXRlQ2FyZCIsIl9jYXJkSW1hZ2VFbCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIl9jYXJkRWxlbWVudCIsInJlbW92ZSIsImdldFZpZXciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX2NhcmRUaXRsZUVsIiwic3JjIiwiYWx0IiwidGV4dENvbnRlbnQiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWwiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2Zvcm0iLCJfaW5wdXRFbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX3N1Ym1pdEJ1dHRvbiIsIl9zaG93SW5wdXRFcnJvciIsImlucHV0RWwiLCJfZXJyb3JNZXNzYWdlRWwiLCJpZCIsImFkZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJfaGFzSW52YWxpZElucHV0Iiwic29tZSIsImZvckVhY2giLCJfaW5wdXRFbCIsIl90b2dnbGVCdXR0b25TdGF0ZSIsInJlc2V0VmFsaWRhdGlvbiIsImRpc2FibGVCdXR0b24iLCJlbmFibGVWYWxpZGF0aW9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiX2VuYWJsZUJ1dHRvbiIsImRpc2FibGVkIiwiTW9kYWwiLCJfcmVmIiwibW9kYWxTZWxlY3RvciIsIl9tb2RhbEVsZW1lbnQiLCJfY2xvc2VCdXR0b24iLCJjbG9zZSIsImJpbmQiLCJvcGVuIiwiX2hhbmRsZUVzY0Nsb3NlIiwiX2hhbmRsZUNsaWNrT3ZlcmxheSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJrZXkiLCJ0YXJnZXQiLCJjb250YWlucyIsInNldEV2ZW50TGlzdGVuZXJzIiwiTW9kYWxXaXRoRm9ybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJzdXBlciIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2dldElucHV0VmFsdWVzIiwiX2lucHV0VmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0IiwiVXNlckluZm8iLCJwcm9maWxlVGl0bGUiLCJwcm9maWxlRGVzY3JpcHRpb24iLCJfZGVzY3JpcHRpb24iLCJnZXRVc2VySW5mbyIsIl91c2VyRGF0YSIsImRlc2NyaXB0aW9uIiwic2V0VXNlckluZm8iLCJfcmVmMiIsInByb2ZpbGVFZGl0QnV0dG9uIiwibW9kYWxUaXRsZUlucHV0IiwiZm9ybXMiLCJtb2RhbERlc2NyaXB0aW9uSW5wdXQiLCJhZGRDYXJkQnV0dG9uIiwiZm9ybSIsImVkaXRNb2RhbCIsInVzZXJJbmZvIiwidGl0bGUiLCJjYXJkTW9kYWwiLCJuZXdDYXJkIiwicmVuZGVyQ2FyZCIsImNhcmRTZWN0aW9uIiwiYWRkSXRlbSIsIm1vZGFsV2l0aEltYWdlIiwiX2ltYWdlIiwiY2FyZERhdGEiLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXMiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiY2FyZEVsZW1lbnQiLCJhcHBlbmQiLCJlbGVtZW50IiwicHJlcGVuZCIsImN1cnJlbnRVc2VySW5mbyJdLCJzb3VyY2VSb290IjoiIn0=