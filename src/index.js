import {
  selectEl,
  catInfo,
  BASE_URL,
  API_KEY,
  fetchBreeds,
  fetchCatByBreed,
} from './cat-api';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_agxgsuGs9k1hIWSomhDkABE1dRb0BsO47kdnu2VQ5tEjX6Y3fY22rwiSEEN0a94V';

import SlimSelect from 'slim-select';

//const selectEl = document.querySelector('.breed-select');
//console.log(selectEl);
//const BASE_URL = 'https://api.thecatapi.com/v1/';
// const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

let slimSelect = null;
console.log('selectEl', selectEl);

// selectEl.style.display = 'none';
loader.style.display = 'none';
error.style.display = 'none';

selectEl.addEventListener('change', onSelect);

function onSelect(evt) {
  console.log(evt.target.value);

  loader.style.display = 'block';
  selectEl.style.display = 'none';
  catInfo.style.display = 'none';

  let selectId = evt.target.value;

  fetchCatByBreed(selectId)
    .then(data => {
      catInfo.insertAdjacentHTML('beforeend', createMarkup(data));
      console.log('selectElData', data);
    })
    .catch(err => {
      error.style.display = 'block';
      // selectEl.style.display = 'none';
    })
    .finally(finnaly => {
      loader.style.display = 'none';
      //selectEl.style.display = 'block';
      catInfo.style.display = 'block';
    });
}

function createMarkup(arr) {
  console.log('arr', arr);

  return arr
    .map(({ url, breeds }) => {
      console.log('breeds', breeds);
      return breeds.map(
        ({ name, description, temperament }) =>
          `<img src="${url}" alt="${name}" width="600"><h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p>`
      );
    })
    .join('');
}

fetchCatByBreed()
  .then(data => {
    console.log('data', data);
  })
  .catch(err => console.log(err));

fetchBreeds()
  .then(data => {
    selectEl.insertAdjacentHTML('beforeend', createSelectorOptions(data));

    slimSelect = new SlimSelect({
      select: selectEl,
    });
    console.log('slimSelect', slimSelect);
  })
  .catch(err => {
    error.style.display = 'block';
    // selectEl.style.display = 'none';
  });

function createSelectorOptions(data) {
  return data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

//https://api.thecatapi.com/v1/images/search?breed_ids=ідентифікатор_породи
//https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME
//https://api.thecatapi.com/v1/images/search
//https://api.thecatapi.com/v1/breeds
