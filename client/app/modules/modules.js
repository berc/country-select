import angular from 'angular';
import CountrySelectModule from './country-select/country-select.module';

let componentModule = angular.module('app.components', [
  CountrySelectModule
])

.name;

export default componentModule;
