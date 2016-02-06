(function() {
    'use strict';
    var contactModule = angular.module('aprcotApp.contact.controllers');
    contactModule.controller('contactController', function($scope, Contact) {
        $scope.success = false;
        $scope.error = false;
        $scope.send = function() {
            var contactInfo = new Contact();
            contactInfo['name'] = $scope.contactInfo.name;
            contactInfo['email'] = $scope.contactInfo.email;
            contactInfo['message'] = $scope.contactInfo.body;
            var contactInfoPromise = contactInfo.$save();
            contactInfoPromise
                .then(function(data) {
                    $scope.success = true;
                    $scope.contactInfo = {};
                    console.log(data);
                }, function(error) {
                    $scope.error = true;
                    console.log(error);
                });
        };
    });
})();
