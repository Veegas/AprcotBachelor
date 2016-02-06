(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.controllers');
    campaignModule.controller('listApplicationController', function(
        $rootScope, $scope,
        UserService, CampaignUtils
    ) {
        $rootScope.$on('user:loggedIn', function() {
            $scope.isLoggedIn = UserService.isLoggedIn();
        });

        $scope.isLoggedIn = UserService.isLoggedIn();
        $scope.applications = $rootScope.APPLICATION_DATA;

        $scope.showDemo = function(applicationId) {
            CampaignUtils.viewDemo(applicationId);
        };

        $scope.createCampaign = function(applicationId) {
            CampaignUtils.create(applicationId);
        };
    });
})();
