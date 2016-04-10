(function () {
  'use strict';
  var commonServices = angular.module('aprcotApp.common.services');
  commonServices.factory('uploadImage', function($resource) {
      return $resource('https://api.imgur.com/3/image', {}, {
          save: {
              method: 'POST',
              headers: {'Authorization': 'Client-ID acb7e170f0a5a1d'}
          }
      });
  });
})();
