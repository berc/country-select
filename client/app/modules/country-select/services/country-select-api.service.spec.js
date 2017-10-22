import CountrySelectModule from "../country-select.module";

describe('countrySelectApiService service', () => {
  let countrySelectApiService, $httpBackend, config;

  beforeEach(window.module(CountrySelectModule));

  beforeEach(inject((_countrySelectApiService_, _$httpBackend_, _config_) => {
    countrySelectApiService = _countrySelectApiService_;
    $httpBackend = _$httpBackend_;
    config = _config_;
  }));

  describe('call GET searchCountries function', () => {
    const COUNTRIES_LIST = [{ id: 'AUT', label: 'Austria' },
      { id: 'ARG', label: 'Argentina' },
      { id: 'AUS', label: 'Australia' }];
    const SEARCH_TEXT = 'testsearch';
    let expectedSearch;
    let httpHandler;

    beforeEach(() => {
      // Arrange
      httpHandler = $httpBackend.expectGET(`${config.COUNTRIES_API_BASE}?search=${SEARCH_TEXT}`);
    });

    it('calls backend with search text and returns data', () => {
      // Arrange
      const STATUS_200 = 200;
      httpHandler.respond((method, url, data, headers, params) => {
        expectedSearch = params.search;
        return [STATUS_200, COUNTRIES_LIST];
      });

      // Act
      countrySelectApiService.searchCountries(SEARCH_TEXT).then((result) => {

        // Assert
        expect(expectedSearch).toEqual(SEARCH_TEXT);
        expect(result).toEqual(COUNTRIES_LIST);
      });
      $httpBackend.flush();
    });

    it('calls backend with search text and handle not found response', () => {
      // Arrange
      const STATUS_404 = 404;
      const EXPECTED_DATA = [];
      httpHandler.respond((method, url, data, headers, params) => {
        expectedSearch = params.search;
        return [STATUS_404, ''];
      });

      // Act
      countrySelectApiService.searchCountries(SEARCH_TEXT).then((result) => {

        // Assert
        expect(expectedSearch).toEqual(SEARCH_TEXT);
        expect(result).toEqual(EXPECTED_DATA);
      });
      $httpBackend.flush();
    });

    it('calls backend with search text and handle 500 error', () => {
      // Arrange
      const STATUS_500 = 500;
      const EXPECTED_DATA = '';
      httpHandler.respond((method, url, data, headers, params) => {
        expectedSearch = params.search;
        return [STATUS_500, EXPECTED_DATA];
      });

      // Act
      countrySelectApiService.searchCountries(SEARCH_TEXT).then((result) => {

        // Assert
        fail("do called success resolve instead of rejection.");
      }, error => {
        expect(expectedSearch).toEqual(SEARCH_TEXT);
        expect(error.status).toEqual(STATUS_500);
        expect(error.data).toEqual(EXPECTED_DATA);
      });
      $httpBackend.flush();
    });
  });

  describe('call POST sendSelectedCountries function', () => {
    const COUNTRIES_LIST = ['AUT', 'AUS'];
    const COUNTRIES_DATA = { isoCodes: COUNTRIES_LIST };
    let httpHandler, expectedData;

    beforeEach(() => {
      // Arrange
      httpHandler = $httpBackend.expectPOST(`${config.COUNTRIES_API_BASE}`);
    });

    it('calls backend with search text and returns data', () => {
      // Arrange
      httpHandler.respond((method, url, data) => {
        expectedData = JSON.parse(data);
        return [200, ''];
      });

      // Act
      countrySelectApiService.sendSelectedCountries(COUNTRIES_LIST).then((result) => {

        // Assert
        expect(JSON.stringify(expectedData)).toEqual(JSON.stringify(COUNTRIES_DATA));
      });
      $httpBackend.flush();
    });

    it('calls backend with countries list and handle returned 500 error', () => {
      // Arrange
      const STATUS_500 = 500;
      const COUNTRIES_LIST = ['AUT', 'AUS'];
      const COUNTRIES_DATA = { isoCodes: COUNTRIES_LIST };
      httpHandler.respond((method, url, data) => {
        expectedData = JSON.parse(data);
        return [STATUS_500, ''];
      });

      // Act
      countrySelectApiService.sendSelectedCountries(COUNTRIES_LIST).then((result) => {

        // Assert
        fail("do called success resolve instead of rejection.");
      }, error => {
        expect(JSON.stringify(expectedData)).toEqual(JSON.stringify(COUNTRIES_DATA));
        expect(error.status).toEqual(STATUS_500);
      });
      $httpBackend.flush();
    });
  });
});
