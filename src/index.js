// import './sass/main.scss';
import { fetchData, promiseName } from './js/api';
import list from './tpl/list.hbs';
import descr from './tpl/descr.hbs';
import debounce from 'lodash.debounce';
import { alert, error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const bagRef = document.querySelector('.countries');
const inputRef = document.querySelector('.find');

inputRef.addEventListener('input', debounce(inputFind, 500));

function inputFind(e) {
  const inputRef = e.target.value;
  const inputValue = inputRef.toLowerCase().trim();

  bagRef.innerHTML = '';
  if (!inputValue) return;
  promiseName(inputRef)
    .then(user => renderCountries(user))
    .catch(error => renderError(error));
}
const renderError = err => {
  error({ text: error });
};

const renderCountries = country => {
  if (country.length >= 2 && country.length <= 10) {
    let countriesElems = list(country);
    bagRef.innerHTML = countriesElems;
  }
  if (country.length === 1) {
    let countriesElems = descr(country);
    bagRef.innerHTML = countriesElems;
  }
  if (country.length > 10) {
    error({
      text: 'Слишком много совпадений!',
    });
  }
};
