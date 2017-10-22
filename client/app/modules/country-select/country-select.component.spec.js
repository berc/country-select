import CountrySelectModule from './country-select.module';

describe('countrySelect component', () => {
  let $rootScope, $componentController, $compile, countrySelectService;

  beforeEach(window.module(CountrySelectModule));

  beforeEach(window.module(($provide) => {
    const mock = jasmine.createSpyObj('countrySelectService',
      ['searchCountries', 'sendSelectedCountries']);
    $provide.value('countrySelectService', mock);
  }));

  beforeEach(inject((_$q_, _$rootScope_, _$componentController_, _$compile_, _countrySelectService_) => {
    $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    $compile = _$compile_;
    countrySelectService = _countrySelectService_;

    decorateSpyWithPromiseResult(_$q_, _countrySelectService_.searchCountries);
    decorateSpyWithPromiseResult(_$q_, _countrySelectService_.sendSelectedCountries);
  }));

  describe('Controller', () => {
    let controller, $scope;

    beforeEach(() => {
      // Arrange
      $scope = $rootScope.$new();

      // Act
      controller = $componentController('countrySelect', { $scope });
    });

    it('has initiated properties', () => {
      // Assert
      expect(controller.selectedCountries).toEqual({});
      expect(controller.filteredCountries).toEqual([]);
      expect(controller.submitResult).toEqual('');
    });

    const REDUSED_COUNTRIES_LIST = [{ id: 'AUT', label: 'Austria' },
      { id: 'ARG', label: 'Argentina' }];
    const COUNTRIES_LIST = [...REDUSED_COUNTRIES_LIST,
      { id: 'AUS', label: 'Australia' }];
    const SELECTED_COUNTRY = { id: 'AUS', label: 'Australia' };
    const SELECTED_COUNTRIES = {'AUS': SELECTED_COUNTRY };
    const SEARCH_TEXT = 'testsearch';

    describe('call onSelectedOption function', () => {
      it('inserts country to list of selected countries and clears list of filtered countries', () => {
        // Arrange

        // Act
        controller.onSelectedOption(SELECTED_COUNTRY);
        $scope.$apply();

        //Assert
        expect(controller.filteredCountries).toEqual([]);
        expect(controller.selectedCountries).toEqual(SELECTED_COUNTRIES);
      });
    });

    describe('call onChangedSearchText function', () => {
      it('calls searchCountries and set list of filteredCountries', () => {
        // Arrange
        countrySelectService.searchCountries.defer.resolve(COUNTRIES_LIST);

        // Act
        controller.onChangedSearchText(SEARCH_TEXT);
        $scope.$apply();

        //Assert
        expect(controller.filteredCountries).toEqual(COUNTRIES_LIST);
        expect(countrySelectService.searchCountries).toHaveBeenCalledWith(SEARCH_TEXT, {});
      });

      it('calls searchCountries and set list of filteredCountries without selected countries', () => {
        // Arrange
        countrySelectService.searchCountries.defer.resolve(COUNTRIES_LIST);
        controller.onSelectedOption(SELECTED_COUNTRY);

        // Act
        controller.onChangedSearchText(SEARCH_TEXT);
        $scope.$apply();

        //Assert
        expect(controller.selectedCountries).toEqual(SELECTED_COUNTRIES);
        expect(controller.filteredCountries).toEqual(COUNTRIES_LIST);
        expect(countrySelectService.searchCountries).toHaveBeenCalledWith(SEARCH_TEXT, SELECTED_COUNTRIES);
      });
    });

    describe('call sendSelectedCountries function', () => {
      it('calls sendSelectedCountries and clears list of filteredCountries, selectedCountries and set submitResult', () => {
        // Arrange
        countrySelectService.sendSelectedCountries.defer.resolve('');
        controller.onSelectedOption(SELECTED_COUNTRY);

        // Act
        controller.sendSelectedCountries();
        $scope.$apply();

        //Assert
        expect(controller.selectedCountries).toEqual({});
        expect(controller.filteredCountries).toEqual([]);
        expect(controller.submitResult).toEqual('Successful submit.');
        expect(countrySelectService.sendSelectedCountries).toHaveBeenCalledWith(SELECTED_COUNTRIES);
      });

      it('calls sendSelectedCountries and handles error returned from the service, set submitResult', () => {
        // Arrange
        const ERROR_STATUS = 500;
        countrySelectService.sendSelectedCountries.defer.reject({ data: '', status: ERROR_STATUS });
        controller.onSelectedOption(SELECTED_COUNTRY);

        // Act
        controller.sendSelectedCountries();
        $scope.$apply();

        //Assert
        expect(controller.selectedCountries).toEqual(SELECTED_COUNTRIES);
        expect(controller.filteredCountries).toEqual([]);
        expect(controller.submitResult).toEqual(`Failed submit. Error status: ${ERROR_STATUS}`);
        expect(countrySelectService.sendSelectedCountries).toHaveBeenCalledWith(SELECTED_COUNTRIES);
      });
    });

    describe('call removeSelectedCountry function', () => {
      it('removes country from selected countries list', () => {
        // Arrange
        controller.onSelectedOption(SELECTED_COUNTRY);
        $scope.$apply();

        // Act
        controller.removeSelectedCountry(0);
        $scope.$apply();

        //Assert
        expect(controller.selectedCountries).toEqual({});
        expect(controller.filteredCountries).toEqual([]);
      });
    });
  });

  describe('View', () => {
    let scope, template;

    beforeEach(() => {
      // Arrange
      const COUNTRIES = {'AUT': {'AUT': 'Austria'}};
      scope = $rootScope.$new();
      template = $compile('<country-select></country-select>')(scope);
      const controller = template.controller('countrySelect');
      controller.selectedCountries = COUNTRIES;

      // Act
      scope.$apply();
    });

    // Assert
    it('has compiled template', () => {
      expect($(template).find('#select-country-caption').html()).toEqual('Selection of Countries');
    });

    it('has connected controller properties', () => {
      expect($(template).find('#selected-countries > li').length).toEqual(1);
    });
  });
});
