(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.controllers');
    campaignModule.controller('listApplicationController', function(
        $rootScope, $scope,
        UserService, CampaignUtils, $state
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
          if (applicationId === 22) {
              $state.go('treasurehunt_create');
          } else {
            CampaignUtils.create(applicationId);
          }
        };
    });
})();
