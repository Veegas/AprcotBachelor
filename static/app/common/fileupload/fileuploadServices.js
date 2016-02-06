(function() {
    'use strict';
    var fileupload = angular.module('aprcotApp.common.fileupload.services');
    fileupload.service('Files', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/images/', {});
        }
    ]);

    fileupload.factory('SingleFile', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/images/:id/', {
                'id': '@id'
            }, {});
        }
    ]);
})();
