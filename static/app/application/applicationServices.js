(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.services');
    applicationModule.factory('Application', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/application/:id', {
                'id': '@id'
            }, {});
        }
    ]);
    applicationModule.factory('ApplicationSettings', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/application/:id/settings/', {
                'id': '@id'
            }, {});
        }
    ]);
    applicationModule.factory('GoogleAnalytics', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/google/property/length/', {}, {
                getTotalNumber: {
                    method: 'GET'
                }
            });
        }
    ]);
})();
