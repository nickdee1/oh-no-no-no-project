import { LOGIN_URI } from '../constants/rest_constants';

export const userService = {
  login,
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text;
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(LOGIN_URI, requestOptions)
    .then(handleResponse)
    .then((token) => token);
}
