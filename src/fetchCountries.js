const url = 'https://restcountries.com/v3.1';

export const fetchCountries = name => {
  return fetch(
    `${url}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
        return console.error('Response is NOT OK!');
    }
    return response.json();
  });
};
