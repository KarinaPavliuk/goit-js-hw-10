import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_agxgsuGs9k1hIWSomhDkABE1dRb0BsO47kdnu2VQ5tEjX6Y3fY22rwiSEEN0a94V';

const selectEl = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_agxgsuGs9k1hIWSomhDkABE1dRb0BsO47kdnu2VQ5tEjX6Y3fY22rwiSEEN0a94V';

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/search?limit=1&breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { selectEl, catInfo, BASE_URL, API_KEY, fetchBreeds, fetchCatByBreed };
