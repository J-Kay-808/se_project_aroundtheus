export default class UserInfo {
  constructor({ profileTitle, profileDescription, avatarSelector}) {
    this.name = document.querySelector(profileTitle);
    this._description = document.querySelector(profileDescription);
    this.avatar = document.querySelector(avatarSelector);

    
  }

  getUserInfo() {
    this._userData = {
      name: this.name.textContent,
      description: this._description.textContent,
    }
    return this._userData
  }

  setUserInfo({ name, description }) {
    this.name.textContent = name;
    this._description.textContent = description;
  }

  setAvatar(link) {
    this.avatar.src = link;
  }

}
