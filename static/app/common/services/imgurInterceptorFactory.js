(function () {
  'use strict';
  var commonServices = angular.module('aprcotApp.common.services');
    commonServices.factory('imgurInterceptor', function() {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = 'Client-ID acb7e170f0a5a1d';
          // config.headers['Client-secret'] = '8acb1e0d67d47d7b274d5af4127e5fa04bb82832';
          return config;
        }
      };
    });
})();
