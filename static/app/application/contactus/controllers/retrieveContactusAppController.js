(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('retrieveContactusAppController', function($scope, FormService,
        campaignId, settings) {
        $scope.form = settings;
        $scope.form.campaign_id = campaignId;
    });
})();
