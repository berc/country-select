import _ from 'lodash';

let serverMockService = function ($httpBackend, config) {
  const COUNTRIES_LIST = [{ id: 'AUT', label: 'Austria' },
    { id: 'ARG', label: 'Argentina' },
    { id: 'ARK', label: 'Arktida' },
    { id: 'AUS', label: 'Australia' },
    { id: 'ANG', label: 'Angora' },
    { id: 'ANT', label: 'Antarktida' }];

  function init() {
    $httpBackend.whenRoute('GET', `${config.COUNTRIES_API_BASE}`)
      .respond((method, url, data, headers, params) => {
        if (!_.isString(params.search)) {
          return [404, [], {}];
        }

        const filteredCountries = COUNTRIES_LIST.filter(
          c => c.label.toLowerCase().indexOf(params.search.toLowerCase()) === 0);
        return [filteredCountries.length > 0 ? 200 : 404, filteredCountries, {}];
      });

    $httpBackend.whenRoute('POST', `${config.COUNTRIES_API_BASE}`)
      .respond((method, url, data) => {
        const countries = JSON.parse(data);
        if (!countries.isoCodes || countries.isoCodes.length === undefined) {
          return [400, '', {}];
        }

        return [204, '', {}];
      });
  }

  return { init };
};

export default ['$httpBackend', 'config', serverMockService];
