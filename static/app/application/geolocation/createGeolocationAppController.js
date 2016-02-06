(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('createGeolocationAppController', function($scope, $modalInstance,
        uiGmapGoogleMapApi, GeolocationAppFactory, settings) {
        $scope.showMap = false;
        uiGmapGoogleMapApi.then(function() {
            $scope.$evalAsync(function() {
                $scope.showMap = true;
            });
        });

        var id = 0;
        $scope.map = {
            center: {
                latitude: 29.9780221,
                longitude: 31.1277665
            },
            zoom: 1,
            clickedMarker: {},
            markers: [],
            events: {
                click: function(mapModel, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat(),
                        lng = e.latLng.lng();
                    $scope.map.clickedMarker = GeolocationAppFactory.toGmapMark(
                        ++id, undefined, lng, lat, 1
                    );
                    $scope.$apply();
                }
            }
        };
        $scope.addMark = function() {
            $scope.map.clickedMarker.options.animation = 0;
            var item = {};
            angular.copy($scope.map.clickedMarker, item);
            $scope.map.clickedMarker = undefined;
            item.options.labelContent = item.name;
            $scope.map.markers.push(item);
        };
        $scope.deleteMarker = function(id) {
            var itemIndex = _.findIndex($scope.map.markers, {
                'id': id
            });
            $scope.map.markers.splice(itemIndex, 1);
        };

        $scope.save = function() {
            var locations = [];
            angular.forEach($scope.map.markers, function(mark) {
                locations.push(GeolocationAppFactory.toAppMark(mark));
            });
            var settings = {
                heading: $scope.campaignName,
                locations: locations
            };
            $modalInstance.close(settings);
        };
        $scope.closeModal = function() {
            $modalInstance.dismiss();
        };
        var renderInitSettings = function(settings) {
            if ('heading' in settings) {
                $scope.campaignName = settings.heading;
            }
            if ('locations' in settings) {
                angular.forEach(settings.locations, function(item) {
                    $scope.map.markers.push(
                        GeolocationAppFactory.toGmapMark(++id, item.title, item.longitude, item.latitude)
                    );
                });
            }
        };
        renderInitSettings(settings);
    });
})();
