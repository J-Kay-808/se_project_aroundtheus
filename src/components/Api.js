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
    return fetch(this.server + "/cards", {
      headers: {
        authorization: "ac6a4a1f-f0eb-49da-ad65-e54f994d4e83",
        method: "GET",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.server}/users/me`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderCards() {
    return Promise.all(this.getUserInfo(), this.getInitialCards());
  }

  updateProfileInfo(name, about) {
    return fetch(`${this.server}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
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
