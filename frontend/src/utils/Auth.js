class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._methodsWithBody = ['PATCH', 'POST', 'PUT'];
  }

  _request(url, method = 'GET', params = {}, token) {
    const options = {
      method,
      headers: this._headers,
    };

    if (token) {
      options['headers']['Authorization'] = `Bearer ${token}`;
    }

    if (this._methodsWithBody.includes(method)) {
      if (params) {
        options['body'] = JSON.stringify(params);
      }
    }

    return fetch(`${this._baseUrl}/${url}`, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  _get(url, method = 'GET', params, token) {
    return this._request(url, method, params, token)
  }

  register(password, email) {
    return this._get('signup', 'POST', {password, email})
  }

  authorize(password, email) {
    return this._get('signin', 'POST', {password, email})
  }

  getContent(token) {
    return this._get('users/me', 'GET', undefined, token)
  }

}


const authApi = new Api(
  {
    baseUrl: 'https://api.thirdyou.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export default authApi;
