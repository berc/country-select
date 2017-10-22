import CountrySelectModule from "../country-select.module";

describe('countrySelectService service', () => {
  let countrySelectService, $rootScope, countrySelectApiService;

  beforeEach(window.module(CountrySelectModule));

  beforeEach(window.module(($provide) => {
    const mock = jasmine.createSpyObj('countrySelectApiService',
      ['searchCountries', 'sendSelectedCountries']);
    $provide.value('countrySelectApiService', mock);
  }));

  beforeEach(inject((_countrySelectService_, _$q_, _$rootScope_, _countrySelectApiService_) => {
    countrySelectService = _countrySelectService_;
    $rootScope = _$rootScope_;
    countrySelectApiService = _countrySelectApiService_;

    decorateSpyWithPromiseResult(_$q_, _countrySelectApiService_.searchCountries);
    decorateSpyWithPromiseResult(_$q_, _countrySelectApiService_.sendSelectedCountries);
  }));

  describe('call searchCountries function', () => {
    const COUNTRIES_LIST = [{ id: 'AUT', label: 'Austria' },
      { id: 'ARG', label: 'Argentina' },
      { id: 'AUS', label: 'Australia' }];
    const SEARCH_TEXT = 'testsearch';

    it('calls API service with search text and returns data', () => {
      // Arrange
      countrySelectApiService.searchCountries.defer.resolve(COUNTRIES_LIST);

      // Act
      countrySelectService.searchCountries(SEARCH_TEXT, {}).then((result) => {
        // Assert
        expect(result).toEqual(COUNTRIES_LIST);
      });
      $rootScope.$apply();

      //Assert
      expect(countrySelectApiService.searchCountries).toHaveBeenCalledWith(SEARCH_TEXT);
    });

    it('calls API service with search text and filter returned data', () => {
      // Arrange
      const EXPECTED_COUNTRIES_LIST = [{ id: 'AUT', label: 'Austria' },
        { id: 'ARG', label: 'Argentina' }];
      const EXCLUDED_COUNTRIES = {'AUS': { id: 'AUS', label: 'Australia' }};
      countrySelectApiService.searchCountries.defer.resolve(COUNTRIES_LIST);

      // Act
      countrySelectService.searchCountries(SEARCH_TEXT, EXCLUDED_COUNTRIES).then((result) => {
        // Assert
        expect(result).toEqual(EXPECTED_COUNTRIES_LIST);
      });
      $rootScope.$apply();

      //Assert
      expect(countrySelectApiService.searchCountries).toHaveBeenCalledWith(SEARCH_TEXT);
    });
  });


  describe('call sendSelectedCountries function', () => {
    const COUNTRIES_MAP = {'ARG': { id: 'ARG', label: 'Argentina' },
      'AUS': { id: 'AUS', label: 'Australia' }};
    const EXPECTED_ARRAY = ['ARG', 'AUS'];
    const RESULT_DATA = '';

    it('calls API service with array of counties', () => {
      // Arrange
      countrySelectApiService.sendSelectedCountries.defer.resolve(RESULT_DATA);

      // Act
      countrySelectService.sendSelectedCountries(COUNTRIES_MAP).then((result) => {
        // Assert
        expect(result).toEqual(RESULT_DATA);
      });
      $rootScope.$apply();

      //Assert
      expect(countrySelectApiService.sendSelectedCountries).toHaveBeenCalledWith(EXPECTED_ARRAY);
    });
  });
});
