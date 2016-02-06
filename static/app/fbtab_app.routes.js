(function() {
    'use strict';
    var root = angular.module('aprcotApp');

    root.config(function($stateProvider, $urlRouterProvider) {
        var APPS_DIR = '/static/app/application/';
        // Set root route to index, if no other routes exist
        $urlRouterProvider.otherwise('home');

        // Set the default empty route to home
        $urlRouterProvider.when('', 'home');

        $stateProvider
        // APRCOT applications routes
            .state('campaignView', {
                url: '/campaign/{campaignId:[0-9]{1,8}}',
                views: {
                    'content@': {
                        controller: 'campaignController',
                    }
                },
            })
            .state('app', {
                url: '/app',
                abstract: true,
                params: {
                    settings: {},
                    campaignId: undefined
                },
                resolve: {
                    settings: function($stateParams) {
                        return $stateParams.settings;
                    },
                    campaignId: function($stateParams) {
                        return $stateParams.campaignId;
                    }
                }
            })
            .state('app.geolocation', {
                url: '/geolocation',
                views: {
                    'content@': {
                        controller: 'retrieveGeolocationAppController',
                        templateUrl: APPS_DIR + 'geolocation/retrieveGeolocationAppView.html'
                    }
                }
            })
            .state('app.geolocation_create', {
                url: '/geolocation',
                views: {
                    'content@': {
                        controller: 'createGeolocationAppController',
                        templateUrl: APPS_DIR + 'geolocation/createGeolocationAppView.html'
                    }
                }
            });
    });
})();
