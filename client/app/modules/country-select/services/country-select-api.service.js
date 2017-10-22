let countrySelectApiService = function ($http, $q, config) {

  function searchCountries(searchText) {
    return $http.get(`${config.COUNTRIES_API_BASE}?search=${searchText}`)
      .then(
        result => result.data,
        error => {
          if (error.status === 404) {
            return [];
          }
          return $q.reject(error);
        }
      );
  }

  function sendSelectedCountries(countries) {
    return $http.post(`${config.COUNTRIES_API_BASE}`, {'isoCodes': countries })
      .then(
        result => result.data
      );
  }

  return { searchCountries, sendSelectedCountries };
};

export default ['$http', '$q', 'config', countrySelectApiService];
