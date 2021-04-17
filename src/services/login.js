import { LOGIN_URI, LOGOUT_URI, GET_PIN_URI, GENERATE_PIN_URI } from '../constants/rest_constants';

const getTokenOperations = (token, username) => ({
  method: 'GET',
  headers: { 'Content-Type': 'application/json', 'X-authSessionId': token, 'username': username },
});

const postTokenOperations = (token) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-authSessionId': token },
});

const postGenTokenOperations = (token, username) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-authSessionId': token, 'username': username},
});


function handleJSONResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = response.status;
      return Promise.reject(error);
    }
    return data;
  });
}

function handleSimpleResponse(response) {
  return response.text().then((text) => {
    const data = text;
    if (!response.ok) {
      const error = response.status;
      return Promise.reject(error);
    }
    return data;
  });
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(LOGIN_URI, requestOptions)
    .then(handleJSONResponse)
    .then((result) => result);
}

function logout(token) {
  const requestOptions = postTokenOperations(token);
  return fetch(LOGOUT_URI, requestOptions).then(handleSimpleResponse).then(result => result)
}

function firstCheckPin(token, username) {
  const requestOptions = getTokenOperations(token, username);
  return fetch(GET_PIN_URI, requestOptions)
    .then(handleJSONResponse)
    .then((result) => result.pin);
}

function getGeneratedPin(token, username) {
  const requestOptions = postGenTokenOperations(token, username);
  console.log(requestOptions)
  return fetch(GENERATE_PIN_URI, requestOptions)
    .then(handleJSONResponse)
    .then((result) => result.pin);
}

export const userService = {
  login,
  logout,
  firstCheckPin,
  getGeneratedPin,
};
