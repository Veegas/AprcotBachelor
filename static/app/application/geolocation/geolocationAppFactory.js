(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.services');
    applicationModule.factory('GeolocationAppFactory', function() {
        return {
            normalizeCenter: function(marks) {
                var sumLongitude = 0;
                var sumLatitude = 0;
                angular.forEach(marks, function(item) {
                    sumLongitude += item.longitude;
                    sumLatitude += item.latitude;
                });
                console.log(sumLongitude);
                var lng = sumLongitude / marks.length;
                var lat = sumLatitude / marks.length;
                return [lng, lat];
            },
            toGmapMark: function(id, name, lng, lat, animate) {
                return {
                    id: id,
                    name: name,
                    longitude: lng,
                    latitude: lat,
                    showWindow: true,
                    options: {
                        animation: animate,
                        labelContent: name,
                        labelClass: "marker-labels"
                    }
                };

            },
            toAppMark: function(mark) {
                return {
                    title: mark['name'],
                    longitude: mark['longitude'],
                    latitude: mark['latitude']
                };
            }
        };
    });
})();
