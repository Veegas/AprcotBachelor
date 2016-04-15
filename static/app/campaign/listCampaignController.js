(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.controllers');
    campaignModule.controller('listCampaignController', function($rootScope, $scope, $modal,
        Campaign, CampaignSettings, CampaignResults, CampaignUtils
    ) {

        var getCampaigns = function() {
            var campaignPromise = Campaign.query().$promise;
            campaignPromise.then(function(response) {
                $scope.campaigns = response;
                console.log("Campaign Query Response: ", response);
            });
        };
        getCampaigns();

        $scope.previewCampaign = function(id, applicationId) {
            CampaignUtils.viewCampaign(id, applicationId);
        };
        $scope.editCampaign = function(id, applicationId) {
            CampaignUtils.edit(id, applicationId).then(function() {
                getCampaigns();
            });
        };
        $scope.deleteCampaign = function(id) {
            var campaign = _.findWhere($scope.campaigns, {
                'id': id
            });
            CampaignUtils.remove(campaign, getCampaigns);
        };
    });
})();
