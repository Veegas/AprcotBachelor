(function() {
    'use strict';
    var analyticsModule = angular.module('aprcotApp.analytics.services');
    analyticsModule.factory('AnalyticsToken', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/google/access_token/');
        }
    ]);
    analyticsModule.factory('AnalyticsProperty', [
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
