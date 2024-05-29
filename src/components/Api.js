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
    })
    .then(this._checkResponse)
      .then((result) => {
        return result;
      });
  }

  getUserInfo() {
    return fetch(`${this.server}/users/me`, {
      headers: this.headers,
    }) .then(this._checkResponse)
    .then((userData) => {
      return userData;
    });
}

  renderCards() {
    return Promise.all(this.getUserInfo(), this.getInitialCards());
  }

updateProfileInfo({name, about}) {
    return fetch(`${this.server}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }) .then((result) => {
      return result;
    });
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

  deleteCard(cardId) {
    return fetch(`${this.server}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this.server}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this.server}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // debug() {
  //   fetch("http://localhost:8080/some-endpoint")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error:", error));
  // }
}
