(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('retrieveStaticHtmlAppController', function($scope, settings) {
        $scope.title = settings.title;
        $scope.content = settings.content;
    });
})();
