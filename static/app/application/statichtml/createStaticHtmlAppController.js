(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('createStaticHtmlAppController', function($scope, $modalInstance) {
        $scope.preview = false;
        $scope.app = {
            title: '',
            content: ''
        };

        $scope.changePreviewStatus = function() {
            $scope.preview = !$scope.preview;
        };

        $scope.save = function() {
            var settings = {
                title: $scope.app.title,
                content: $scope.app.content
            };
            $modalInstance.close(settings);
        };

        $scope.closeModal = function() {
            $modalInstance.dismiss();
        };

    });

})();
