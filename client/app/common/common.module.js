import angular from 'angular';
import config from './config/config';
import editableSelect from './directives/editable-select.directive';
import ngMockE2E from 'angular-mocks/ngMockE2E';

import serverMockService from './services/server-mock.service';

let commonModule = angular.module('CommonModule', [
  ngMockE2E
])

.directive('editableSelect', editableSelect)

.factory('config', config)
.factory('serverMockService', serverMockService)

.name;

export default commonModule;
