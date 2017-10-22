import CountrySelectModule from './country-select.module';

describe('countrySelect module', () => {
  let $rootScope, $state, $location;

  beforeEach(window.module(CountrySelectModule));

  beforeEach(window.module(($provide) => {
    const mock = jasmine.createSpyObj('countrySelectService',
      ['searchCountries', 'sendSelectedCountries']);
    $provide.value('countrySelectService', mock);
  }));

  beforeEach(inject((_$rootScope_, _$state_, _$location_) => {
    $rootScope = _$rootScope_;
    $state = _$state_;
    $location = _$location_;
  }));

  describe('Module', () => {
    it('default component should be countrySelect', () => {
      // Act
      $location.url('/');
      $rootScope.$digest();
      // Assert
      expect($state.current.component).toEqual('countrySelect');
    });
  });
});
