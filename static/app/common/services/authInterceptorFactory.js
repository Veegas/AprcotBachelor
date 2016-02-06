(function() {
    'use strict';
    var commonServices = angular.module('aprcotApp.common.services');
    commonServices.factory('AuthInterceptor', function($rootScope, $q, $window, toaster) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Token ' + $window.sessionStorage.token;
                }
                return config;
            },
            requestError: function(rejection) {
                console.log(rejection); // Contains the data about the error on the request.

                // Return the promise rejection.
                return $q.reject(rejection);
            },
            response: function(response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    toaster.pop('error', "User Not Authenticated");
                }
                return response || $q.when(response);
            },
            responseError: function(response) {
                if (response.status === 400) {
                    if (response.data['detail'] !== undefined) {
                        toaster.pop('error', "Aprcot Error",
                            response.data['detail']);
                    } else if (response.data['non_field_errors'] !== undefined) {
                        toaster.pop('error', "Aprcot Error",
                            response.data['non_field_errors'][0]);
                    }
                }
                return $q.reject(response);
            }
        };
    });
})();
