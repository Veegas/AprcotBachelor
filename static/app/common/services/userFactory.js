(function() {
    'use strict';
    var commonServices = angular.module('aprcotApp.common.services');
    commonServices.factory('User', function($resource) {
        return $resource('https://guc.aprcot.com/api/me/', {}, {
            getMe: {
                method: 'GET'
            }
        });
    });
    commonServices.factory('FbUser', function($resource) {
        return $resource('https://guc.aprcot.com/facebook/:action/', {}, {
            getLoginUrl: {
                method: 'GET',
                params: {
                    action: 'loginUrl'
                }
            },
            authenticate: {
                method: 'GET',
                params: {
                    action: 'authorize'
                }
            }
        });
    });
})();
