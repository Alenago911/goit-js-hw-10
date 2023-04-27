import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  e.preventDefault();
  if (!e.target.value) {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  const name = e.target.value.trim();
  fetchCountries(name).then(getCountries).catch(errorMessage);
}

function renderCountries(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
<li>
<img src="${flags.svg}" alt="${flags.alt}" width="40", height="30">
${name.official}
</li>
`;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function renderCountryCard(country) {
  const markupCountry = country
    .map(({ name, capital, population, flags, languages }) => {
      return `
<div class="country">
<img src="${flags.svg}" alt="${flags.alt}" width="60", height="30">
<h1 class="name-country">${name.official}</h1>
</div>
<div class="country-container">
<p><p>Capital: </b>${capital}</p>
<p><p>Population: </b>${population}</p>
<p><p>Languages: </b>${Object.values(languages)}</p>
</div>
`;
    })
    .join();
  countryInfo.innerHTML = markupCountry;
}


function getCountries(country) {
  if (country.length === 1) {
    countriesList.innerHTML = '';
    renderCountryCard(country);
  } else if (country.length >= 10) {
    countryInfo.innerHTML = '';
    renderCountries(country);
    refineRequestMessage();
  } else {
    countryInfo.innerHTML = '';
    errorMessage();
  }
}

function refineRequestMessage() {
  Notify.info('Too many matches found. Please enter a more specific name.', {
  });
}

function errorMessage() {
  Notify.failure('Oops, there is no country with that name.', {
  });
}
