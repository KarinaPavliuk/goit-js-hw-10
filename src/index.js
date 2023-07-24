import { selectEl, catInfo, fetchBreeds, fetchCatByBreed } from './cat-api';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_agxgsuGs9k1hIWSomhDkABE1dRb0BsO47kdnu2VQ5tEjX6Y3fY22rwiSEEN0a94V';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loader = document.querySelector('.loader');
let slimSelect = null;

loader.style.display = 'none';

selectEl.addEventListener('change', onSelect);

function onSelect(evt) {
  catInfo.innerHTML = '';
  slimSelect.disable();
  loader.style.display = 'flex';
  selectEl.style.display = 'none';
  catInfo.style.display = 'none';

  let selectId = evt.target.value;

  fetchCatByBreed(selectId)
    .then(data => {
      catInfo.insertAdjacentHTML('beforeend', createMarkup(data));
    })
    .catch(() => {
      return Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      slimSelect.enable();
      loader.style.display = 'none';
      catInfo.style.display = 'flex';
    });
}

function createMarkup(arr) {
  return arr
    .map(({ url, breeds }) => {
      return breeds.map(
        ({ name, description, temperament }) =>
          `<img class="cat-img" src="${url}" alt="${name}" width="600"><div class="cat-img-caption"><h2 class="cat-name">${name}</h2><p class="cat-descr">${description}</p><p><span class="cat-temperament">Temperament: </span>${temperament}</p></div>`
      );
    })
    .join('');
}

fetchBreeds()
  .then(data => {
    selectEl.insertAdjacentHTML('beforeend', createSelectorOptions(data));

    slimSelect = new SlimSelect({
      select: selectEl,
      settings: {
        placeholderText: 'Select a breed',
      },
    });
  })
  .catch(err => {
    return Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function createSelectorOptions(data) {
  return data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}
