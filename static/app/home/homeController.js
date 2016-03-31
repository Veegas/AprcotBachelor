(function() {
    'use strict';
    var homeModule = angular.module('aprcotApp.home.controllers');
    homeModule.controller('homeController', function($rootScope, $scope, $timeout, $http, UserService) {
        $scope.isLoggedIn = UserService.isLoggedIn();
        $rootScope.$on('user:loggedIn', function() {
            $scope.isLoggedIn = UserService.isLoggedIn();
        });
        $scope.login = function() {
            UserService.loginWindow();
        };

        $http({
          method: 'GET',
          url: 'https://guc.aprcot.com/api/page/1142440212446421/tab/8/'

        }).then(function successCallback(response) {
            console.log("HOME HTTP: ", response.data);
          }, function errorCallback(response) {
            console.log("HOME HTTP: ", response.data);
          });


    });
})();
