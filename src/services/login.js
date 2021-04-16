import { LOGIN_URI, GET_PIN_URI, GENERATE_PIN_URI } from '../constants/rest_constants';

export const userService = {
  login,
  firstCheckPin,
  getGeneratedPin
};

const getTokenOperations = (token) => ({
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'X-authSessionId': token },
});

const generateTokenOperations = (token) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-authSessionId': token },
});

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
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
    .then((result) => result.authSessionId);
}

function firstCheckPin(token) {
  const requestOptions = getTokenOperations(token);
  return fetch(GET_PIN_URI, requestOptions)
    .then(handleResponse)
    .then((result) => result.pin)
}

function getGeneratedPin(token) {
  const requestOptions = generateTokenOperations(token);
  return fetch(GENERATE_PIN_URI, requestOptions)
    .then(handleResponse)
    .then((result) => result.pin)
}
