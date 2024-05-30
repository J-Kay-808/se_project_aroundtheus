 export default class UserInfo {
  constructor({ profileTitle, profileDescription, avatarSelector}) {
    this.name = document.querySelector(profileTitle);
    this._description = document.querySelector(profileDescription);
    this._avatarElement = document.querySelector(avatarSelector);

    
  }

  getUserInfo() {
    this._userData = {
      name: this.name.textContent,
      description: this._description.textContent,
      avatar: this._avatarElement.src,
    }
    return this._userData
  }

  setUserInfo({ name, description }) {
    this.name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }

}
