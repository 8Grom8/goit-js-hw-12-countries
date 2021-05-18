const JSON_BASE_URL = 'https://restcountries.eu/rest/v2';

const fetchData = (request = '/') =>
  fetch(JSON_BASE_URL + request).then(response => response.json());

const promiseName = name =>
  fetch(`${JSON_BASE_URL}/name/${name}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error!!! ${name} not exist`);
  });

export { fetchData, promiseName };
