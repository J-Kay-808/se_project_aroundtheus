export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._name = document.querySelector(profileTitle);
    this._description = document.querySelector(profileDescription);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      description: this._description.textContent,
    }
    return this._userData
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

}
