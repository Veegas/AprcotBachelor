(function() {
    'use strict';
    var facebookModule = angular.module('aprcotApp.facebook.controllers');
    facebookModule.controller('addTabController', function($scope, $q, $modalInstance, $filter,
        toaster, FacebookPages, Application, AprcotCampaign,
        AccessToken, FacebookPage, FacebookPageTab, campaignInstance) {
        $scope.title = 'Facebook App';

        $scope.tab = {
            campaign: '',
            name: '',
            page: {}
        };
        $scope.campaign = {
            startDate: '',
            endDate: ''
        };

        $scope.selectFBPageView = true;
        $scope.selectAprAppView = false;
        $scope.selectAprAppViewSettings = false;


        var fbPagesPromise = FacebookPages.get().$promise;
        fbPagesPromise.then(function(response) {
            $scope.pages = response.pages;
        });
        $scope.closeModal = function() {
            $modalInstance.dismiss('canceled');
        };

        $scope.valid = false;
        $scope.canAddPageTab = function() {
            console.log($scope.tab.page);
            var promise = FacebookPage.get({
                'pk': $scope.tab.page.id
            }).$promise;
            promise.then(function(page) {
                if (page['available_apps_count'] === 0) {
                    toaster.pop('warning',
                        'Maximum Limit', 'You\'ve reached the maximum number of tabs per this page.');
                    $scope.valid = false;
                } else {
                    console.log(page['available_apps_count']);
                    $scope.valid = true;
                }
            }, function(error) {
                console.log(error);
                if (error['status'] === 404) {
                    $scope.valid = true;
                }
            });
        };
        $scope.selectAprApp = function() {

            /* Create New Page Access Token */
            var getToken = function() {
                var SelectedFBPage = $scope.tab.page;
                var SelectedFBPageAT = SelectedFBPage['access_token'];
                var PageAccessToken = new AccessToken();
                PageAccessToken.token = SelectedFBPageAT;
                return PageAccessToken.$save();
            };

            /* Get Page Promise */
            var getPage = getToken().then(function(tokenResponse) {
                var FbPage = new FacebookPage();
                var SelectedFBPage = $scope.tab.page;
                var SelectedFBPageID = SelectedFBPage['id'];
                FbPage['id'] = SelectedFBPageID;
                FbPage['access_token'] = tokenResponse['id'];
                $scope.fbPage = FbPage;
                return FbPage.$save();
            });

            /* Create New Page or Get Existing Page*/
            var getPageHandler = getPage.then(function(pageResponse) {
                return pageResponse;
            }, function(pageError) {
                console.log(pageError);
                var SelectedFBPage = $scope.tab.page;
                var SelectedFBPageID = SelectedFBPage['id'];
                var fbPageDetails = FacebookPage.get({
                    'pk': SelectedFBPageID
                });
                return fbPageDetails.$promise.then(function(data) {
                    return data;
                });
            });

            /* Existing Page Details & Assign New Access Token*/
            var getExistingPage = getPageHandler.then(function(data) {
                var FbPage = $scope.fbPage;

                data['access_token'] = FbPage['access_token'];
                var FacebookPageElement = new FacebookPage(data);
                return FacebookPageElement.$update({
                    'pk': FacebookPageElement['id']
                });
            });

            /* Update Existing Page */
            var updateExistingPage = getExistingPage.then(function(pageUpdated) {
                return pageUpdated;
            });

            /* Execute Page Processes and return with the Page */
            var checkPage = function() {
                var process = updateExistingPage;
                return process;
            };

            var updateCampaign = function() {
                var campaignEntity = campaignInstance;
                campaignEntity['date_start'] = $scope.campaign.startDate;
                campaignEntity['date_end'] = $scope.campaign.endDate;
                console.log(campaignEntity);
                var campaignEntityWU = new AprcotCampaign(campaignEntity);
                console.log(campaignEntityWU);
                return campaignEntityWU;
            };
            var updateCampaign1 = updateCampaign().$update({
                'pk': campaignInstance['id']
            }).then(function(data) {
                console.log(data);
                return data;
            }, function(error) {
                console.log(error);
                return error;
            });

            var yallaUpdateCampaign = function() {
                var updatedCampaign = updateCampaign1;
                return updatedCampaign;
            };

            /* Creating New Page Tab */
            $q.all([checkPage(), yallaUpdateCampaign()]).then(function(responses) {
                var pageResult = responses[0];
                var pageResultId = pageResult['id'];
                var pageTab = new FacebookPageTab();
                pageTab.name = $scope.tab.name;

                pageTab.campaign = campaignInstance['id'];
                pageTab.position = 1;
                pageTab.$save({
                    'page_id': pageResultId
                }).then(function(data) {
                    $modalInstance.close({
                        'state': 'created',
                        'tab': data
                    });
                    toaster.pop('success', 'Congratulations', 'You Application has been successfully created');
                }, function(error) {
                    console.log(error);
                });
            });
        };

    });


    facebookModule.directive('toggle', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if (attrs.toggle === "tooltip") {
                    $(element).tooltip();
                }
                if (attrs.toggle === "popover") {
                    $(element).popover();
                }
            }
        };
    });
})();
