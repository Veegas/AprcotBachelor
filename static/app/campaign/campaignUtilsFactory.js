(function() {
    'use strict';
    var campaignModule = angular.module('aprcotApp.campaign.services');
    campaignModule.factory('CampaignUtils', function(
        $modal, $rootScope,
        Campaign, CampaignSettings, CampaignResults, ApplicationSettings,
        Helpers
    ) {
        return {
            create: function(applicationId) {
                var modalInstance = this.view(applicationId, {}, false);
                modalInstance.result.then(function(settings) {
                    var campaignObj = new Campaign({
                        application: applicationId
                    });
                    var campaignSettingsObj = new CampaignSettings(settings);
                    campaignObj.$save().then(function() {
                        campaignSettingsObj['campaign_id'] = campaignObj.id;
                        campaignSettingsObj.$save().then(function() {
                            var state = Helpers.getStateFromIdentifier('addTab');
                            var resolve = {};
                            resolve['campaignInstance'] = function() {
                                return campaignObj;
                            };
                            Helpers.createModalFromState(state, resolve);
                        });
                    });
                });
            },
            edit: function(id, applicationId) {
                var modalInstance = this.view(applicationId, this.getCampaignSettings(id), false);
                return modalInstance.result.then(function(settings) {
                    var campaignSettingsObj = new CampaignSettings(settings);
                    campaignSettingsObj['campaign_id'] = id;
                    return campaignSettingsObj.$save();
                });
            },
            remove: function(campaignObj, callback) {
                if (confirm('are you sure you want to delete the campaign ' + campaignObj.title + ' ?')) {
                    return Campaign.remove({
                        'pk': campaignObj.id
                    }).$promise.then(function() {
                        callback();
                    });
                }
            },
            getDefaultSettings: function(applicationId) {
                return ApplicationSettings.get({
                    'id': applicationId
                }).$promise.then(function(applicationSettingsObj) {
                    return applicationSettingsObj;
                });
            },

            getCampaignSettings: function(id) {
                return CampaignSettings.get({
                    'campaign_id': id
                }).$promise.then(function(campaignSettingsObj) {
                    return campaignSettingsObj;
                });
            },
            getCampaignResults: function(id) {
                return CampaignResults.query({
                    'campaign_id': id
                }).$promise ;
            },
            submitCampaignResults: function(campaignId, results) {
                var campaignResultsObj = new CampaignResults(results);
                campaignResultsObj['campaign_id'] = campaignId;
                return campaignResultsObj.$save();
            },
            view: function(applicationId, settingsFunc, readonly) {

                var application = $rootScope.APPLICATION_DATA[applicationId];
                var stateName = readonly ? application.identifier : application.identifier + '_create';
                var stateObj = Helpers.getAppStateFromIdentifier(stateName);
                return Helpers.createModalFromState(
                    stateObj, {
                        settings: function() {
                            return settingsFunc;
                        },
                        campaignId: function(){
                            return undefined;
                        }
                    }
                );
            },

            viewDemo: function(applicationId) {
                return this.view(applicationId, this.getDefaultSettings(applicationId), true);
            },
            viewCampaign: function(id, applicationId) {
                return this.view(applicationId, this.getCampaignSettings(id), true);
            },
        };
    });
})();
