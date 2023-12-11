import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_1pIja6gsDQr5Y66KEYoz3wUiR1iAcAIMqz67wwyyBBXfzCUkqvM5Nhe6614hRYn5';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => response.data);
};

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(response => response.data);
}