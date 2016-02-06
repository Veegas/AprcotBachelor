(function() {
    'use strict';
    var homeModule = angular.module('aprcotApp.home.services');
    homeModule.factory('Facebook', function($resource) {
        return $resource('https://guc.aprcot.com/facebook/:action/', {
            state: '@state'
        }, {
            getLoginUrl: {
                method: 'GET',
                params: {
                    action: 'loginUrl'
                }
            }
        });
    });
})();
