class countrySelectController {
  filteredCountries = [];
  selectedCountries = {};

  constructor($rootScope, countrySelectService, config) {
    this.$rootScope = $rootScope;
    this.countrySelectService = countrySelectService;
    this.config = config;
    this.submitResult = '';
  }

  $onInit() {
    this.clearOptions();
    this.clearSelectedCountries();
  }

  onChangedSearchText(value) {
    if (!value) {
      this.clearOptions();
      return;
    }

    this.countrySelectService.searchCountries(value, this.selectedCountries).then(countries => {
      this.filteredCountries = countries;
    });
  }

  sendSelectedCountries() {
    this.countrySelectService.sendSelectedCountries(this.selectedCountries).then(() => {
      this.clearOptions();
      this.clearSelectedCountries();
      this.submitResult = 'Successful submit.';
    },
    error => {
      this.submitResult = `Failed submit. Error status: ${error.status}`;
    });
  }

  removeSelectedCountry(id) {
    delete this.selectedCountries[id];
  }

  onSelectedOption(option) {
    this.selectedCountries[option.id] = option;
    this.clearOptions();
  }

  clearOptions() {
    this.filteredCountries = [];
  }

  clearSelectedCountries() {
    this.selectedCountries = {};
  }
}

export default ['$rootScope', 'countrySelectService', 'config', countrySelectController];
