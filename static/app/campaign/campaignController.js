(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.controllers');
    campaignModule.controller('campaignController', function(
        $rootScope, $window, $location,
        $state, $stateParams,
        Campaign, CampaignSettings, CampaignAnalytics
    ) {

        var campaignId = $stateParams.campaignId;
        Campaign.get({
            'pk': campaignId
        }).$promise.then(function(campaignObj) {
            CampaignSettings.get({
                'campaign_id': campaignObj.id
            }).$promise.then(function(campaignSettingsObj) {
                var application = $rootScope.APPLICATION_DATA[campaignObj.application];
                var stateId = 'app.' + application.identifier;
                $state.go(stateId, {
                    settings: campaignSettingsObj,
                    campaignId: campaignObj.id
                });
            });
        });

        var _analyticsPropertyTrackingId;
        CampaignAnalytics.query({
            'campaign_id': campaignId
        }).$promise.then(function(data) {
            _analyticsPropertyTrackingId = data[0]['property_tracking_id'];
            $window.ga('create', _analyticsPropertyTrackingId, 'auto');
            $window.ga('send', 'pageview', {
                page: $location.url()
            });
        });
    });
})();
