(function() {
    'use strict';
    var contactModule = angular.module('aprcotApp.contact.services');
    contactModule.factory('Contact', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/contact/', {
                'save': {
                    method: 'POST'
                }
            });
        }
    ]);
})();
