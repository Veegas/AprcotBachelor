(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('retrieveGeolocationAppController', function($scope, uiGmapGoogleMapApi,
        GeolocationAppFactory, settings) {
        uiGmapGoogleMapApi.then(function() {
            $scope.$evalAsync(function() {
                $scope.showMap = true;
            });
        });
        $scope.showMap = false;
        $scope.title = settings.heading;
        $scope.markers = [];
        $scope.map = {
            center: {},
            zoom: 10,
            events: {}
        };
        angular.forEach(settings.locations, function(item) {
            var mark = GeolocationAppFactory.toGmapMark(
                item.title, item.title, item.longitude, item.latitude, item.animate
            );
            $scope.markers.push(mark);
        });
        var center = GeolocationAppFactory.normalizeCenter($scope.markers);
        $scope.map.center.longitude = center[0];
        $scope.map.center.latitude = center[1];

    });
})();
