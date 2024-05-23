export default class Api {
  constructor(options) {
    this.server = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.server}/cards`, {
      headers: this.headers,
      method: "GET",
    })
    .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.server}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  renderCards() {
    return Promise.all(this.getUserInfo(), this.getInitialCards());
  }

  updateProfileInfo(name, about) {
    return fetch(`${this.server}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this.server}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }


  createNewCard(data) {
    return fetch(`${this.server}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

}
