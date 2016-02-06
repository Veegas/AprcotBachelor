(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.controllers');
    campaignModule.controller('campaignResultsController', function($scope, $stateParams,
        CampaignResults, CampaignUtils) {
        var campaignId = $stateParams.campaignId;
        var getCampaignResults = function(id) {
            return CampaignUtils.getCampaignResults(id);
        };
        var resultsPromise = getCampaignResults(campaignId);
        resultsPromise.then(function(campaignResultsObj) {
            if (angular.equals(campaignResultsObj, [])) {
                $scope.results = null;
            } else {
                $scope.results = campaignResultsObj;
            }
        });
    });
})();
