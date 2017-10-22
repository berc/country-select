let countrySelectService = function (countrySelectApiService) {

  function searchCountries(searchText, excludedCountries) {
    return countrySelectApiService.searchCountries(searchText).then(countries =>
      countries.filter(country => !excludedCountries[country.id])
    );
  }

  function sendSelectedCountries(countriesMap) {
    const countriesArray = Object.keys(countriesMap).map((k) => countriesMap[k]).map(c => c.id);
    return countrySelectApiService.sendSelectedCountries(countriesArray);
  }

  return { searchCountries, sendSelectedCountries };
};

export default ['countrySelectApiService', countrySelectService];
