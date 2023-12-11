import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorBreeds = document.querySelector('.error');

breedSelect.setAttribute('hidden', 'true');
loader.setAttribute('hidden', 'true');
errorBreeds.setAttribute('hidden', 'true');

fetchBreeds()
  .then(breeds => {
    const createMarkup = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    
    breedSelect.insertAdjacentHTML('beforeend', createMarkup);

    new SlimSelect({
      select: 'select.breed-select',
    });
    
    breedSelect.removeAttribute('hidden');
    loader.setAttribute('hidden', 'true');
  })
  .catch(error => {
    errorBreeds.removeAttribute('hidden');
    loader.setAttribute('hidden', 'true');
    Notiflix.Notify.failure(`${error}`);
  });

breedSelect.addEventListener('change', () => {
  catInfo.innerHTML = '';
  loader.removeAttribute('hidden');
  const value = breedSelect.value;
  fetchCatByBreed(value)
    .then(data => {
      const { url, breeds } = data[0];
      const { description, temperament, name } = breeds[0];

      const createMarkup = `<div style='display: flex; gap:35px;'>
    <img src = ${url} alt = ${value} width='400' />
    <div>
    <h1>${name}</h1><p>${description}</p><p><b>Temperament: </b>${temperament}</p>
    </div>
    </div>`;
      catInfo.insertAdjacentHTML('afterbegin', createMarkup);
      loader.setAttribute('hidden', 'true');
    })
    .catch(error => {
      errorBreeds.removeAttribute('hidden');
      loader.setAttribute('hidden', 'true');
      Notiflix.Notify.failure(`${error}`);
    });
});