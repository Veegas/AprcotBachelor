(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.services');
    campaignModule.factory('Campaign', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/campaign/:pk/', {
                'pk': '@pk'
            }, {
                update: {
                    method: "PUT"
                }
            });
        }
    ]);
    campaignModule.factory('CampaignSettings', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/campaign/:campaign_id/settings/', {
                'campaign_id': '@campaign_id'
            }, {});
        }
    ]);
    campaignModule.factory('AprcotApplication', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/application/:pk/', {
                'pk': '@pk'
            }, {});
        }
    ]);
    campaignModule.factory('CampaignAnalytics', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/campaign/:campaign_id/analytics/', {
                'campaign_id': '@campaign_id'
            });
        }
    ]);
    campaignModule.factory('CampaignResults', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/campaign/:campaign_id/results/', {
                'campaign_id': '@campaign_id'
            }, {});
        }
    ]);
})();
