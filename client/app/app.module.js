import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import Common from './common/common.module';
import Modules from './modules/modules';
import AppComponent from './app.component';
import 'normalize.css';
import 'angular-mocks';

let $ = require('jquery');
window.jQuery = $;
require('bootstrap-loader');

angular.module('app', [
    uiRouter,
    uiBootstrap,
    Common,
    Modules
  ])
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .run((serverMockService) => {
    'ngInject';

    serverMockService.init();
  })

  .component('app', AppComponent);
