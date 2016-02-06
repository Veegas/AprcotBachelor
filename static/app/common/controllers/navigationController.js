(function() {
    'use strict';
    var commonModule = angular.module('aprcotApp.common.controllers');
    commonModule.controller('navigationController', function(
        $rootScope, $location, $scope, UserService, FacebookPages) {
        $scope.login = function() {
            UserService.loginWindow();
        };
        $scope.logout = function() {
            UserService.logout();
        };
        var getUserInfo = function() {
            $scope.name = UserService.me.username;
            var fbPagesPromise = FacebookPages.get().$promise;
            fbPagesPromise.then(function(response) {
                $scope.fbPages = response.pages;
                $scope.isLoggedIn = UserService.isLoggedIn();
            });
        };
        $rootScope.$on('user:loggedIn', function() {
            getUserInfo();
        });
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.isLoggedIn = UserService.isLoggedIn();
        if ($scope.isLoggedIn) {
            getUserInfo();
        }
    });
})();
