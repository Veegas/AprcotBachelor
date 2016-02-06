(function() {
    'use strict';
    var homeModule = angular.module('aprcotApp.home.controllers');
    homeModule.controller('homeController', function($rootScope, $scope, $timeout, UserService) {
        $scope.isLoggedIn = UserService.isLoggedIn();
        $rootScope.$on('user:loggedIn', function() {
            $scope.isLoggedIn = UserService.isLoggedIn();
        });
        $scope.login = function() {
            UserService.loginWindow();
        };
    });
})();
