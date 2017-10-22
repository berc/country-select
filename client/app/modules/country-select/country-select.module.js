import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import Common from '../../common/common.module';

import countrySelectComponent from './country-select.component';

import countrySelectApiService from './services/country-select-api.service';
import countrySelectService from './services/country-select.service';

let CountrySelectModule = angular.module('CountrySelectModule', [
  uiRouter,
  Common
])

.config(($stateProvider, $urlRouterProvider) => {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('countrySelect', {
      url: '/',
      component: 'countrySelect'
    });
})

.component('countrySelect', countrySelectComponent)

.factory('countrySelectService', countrySelectService)
.factory('countrySelectApiService', countrySelectApiService)

.name;

export default CountrySelectModule;
