(function() {
    'use strict';
    var commonModule = angular.module('aprcotApp.common.filters');
    commonModule.filter('rawHtmlFilter', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });

})();
