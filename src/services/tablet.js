import { GET_TABLET_PLACE_URI } from '../constants/rest_constants';

const getPinOperation = (pin) => ({
  method: 'GET',
  headers: { 'Content-Type': 'application/json', PIN: pin },
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

function getParkingPosition(pin) {
  const requestOptions = getPinOperation(pin);
  return fetch(GET_TABLET_PLACE_URI, requestOptions)
    .then(handleResponse)
    .then((result) => result)
}

const tabletService = {
  getParkingPosition,
};

export default tabletService;
