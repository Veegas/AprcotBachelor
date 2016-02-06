(function() {
    'use strict';
    var root = angular.module('aprcotApp');
    root.config(function($resourceProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
        // Turn off the loading bar spinner
        // Set Django CSRF token, for all XHR requests
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.interceptors.push('AuthInterceptor');

        $resourceProvider.defaults.stripTrailingSlashes = false;

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDvbApX5xKUDtMrR19ykrGuXGtrGq8H6QA',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });

    }).run(function($rootScope, $state, ngAnalyticsService, Application) {
        // Expose underscore library to the rootscope, to use it in all child scopes
        // $rootScope._ = _;
        //Cache aproct application during startup
        (function() {
            var applicationPromise = Application.query().$promise;
            applicationPromise.then(function(response) {
                var APPLICATION_DATA = {};
                angular.forEach(response, function(app) {
                    console.log(APPLICATION_DATA);
                    APPLICATION_DATA[app.id] = app;
                });
                $rootScope.APPLICATION_DATA = APPLICATION_DATA;
            });
        })();

        // Define the Server Access Token for Google Analytics.
        // OverLoading ngAnalyticsService authorization method to handle service account.
        ngAnalyticsService._serverToken = undefined;
        ngAnalyticsService.setServerToken = function(token) {
            var self = this;
            self._serverToken = token;
            return token;
        };
        ngAnalyticsService.getServerToken = function() {
            var self = this;
            return self._serverToken;
        };
        ngAnalyticsService.authorize = function() {
            var self = this;
            (function() {
                self.ga.auth.authorize({
                    serverAuth: {
                        'access_token': self.getServerToken()
                    }
                });
            })();
        };
    });
})();
