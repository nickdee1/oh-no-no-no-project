import { GET_SCHEDULE_URI } from '../constants/rest_constants';

const getScheduleOperations = (token) => ({
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-authSessionId': token,
  },
});

function handleJSONResponse(response) {
  return response.text()
    .then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = response.status;
        return Promise.reject(error);
      }
      return data;
    });
}

function getSchedule(token) {
  const requestOptions = getScheduleOperations(token);
  return fetch(GET_SCHEDULE_URI, requestOptions)
    .then(handleJSONResponse)
    .then((result) => result);
}

export const scheduleService = {
  getSchedule,
};
