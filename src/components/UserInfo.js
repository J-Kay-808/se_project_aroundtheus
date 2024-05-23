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
      avatar: this.avatar.src,
    }
    return this._userData
  }

  setUserInfo({ name, description, avatar }) {
    this.name.textContent = name;
    this._description.textContent = description;
    this.avatar.src = avatar;
  }

}
