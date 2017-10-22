/**
 * 2016, Rastislav Bertusek
 */

'use strict';

angular.module('$translate.mock', []).provider('$translate', function(){
    const $translateProvider = jasmine.createSpyObj('$translateProvider',
        ['useLocalStorage', 'preferredLanguage', 'useLoaderCache', 'useSanitizeValueStrategy', 'useLoader']);
    return {
        useLoaderCache: $translateProvider.useLoaderCache,
        useSanitizeValueStrategy: $translateProvider.useSanitizeValueStrategy,
        useLoader: $translateProvider.useLoader,
        useLocalStorage: $translateProvider.useLocalStorage,
        preferredLanguage: $translateProvider.preferredLanguage,
        $get: ['$q', function($q){
            function $translateMock(key){
                function transformArrayToObject(values) {
                    let res = {};
                    forEach(values, function (value) {
                        res[value] = value;
                    });
                    return res;
                }

                return $q.when(angular.isArray(key) ? transformArrayToObject(key) : key);
            }

            const noop = angular.noop;
            $translateMock.useLoader = jasmine.createSpy('$translate.useLoader');
            $translateMock.use = jasmine.createSpy('$translate.use');
            $translateMock.preferredLanguage = noop;
            $translateMock.storage = noop;
            $translateMock.storageKey = noop;
            $translateMock.instant = function (translationId) {
                return translationId;
            };
            $translateMock.directivePriority = noop;
            $translateMock.isPostCompilingEnabled = noop;
            $translateMock.statefulFilter = noop;
            return $translateMock;
        }]
    }
});
