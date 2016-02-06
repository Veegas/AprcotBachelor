(function() {
    'use strict';
    var analyticsModule = angular.module('aprcotApp.analytics.controllers');

    analyticsModule.controller('retrieveAnalyticsController', function($scope, $stateParams, toaster,
        Campaign, AnalyticsToken,
        ngAnalyticsService, CampaignAnalytics) {
        var campaignId = $stateParams.campaignId;
        var _analyticsMainViewId;
        var campaignPromise = Campaign.get({
            'pk': campaignId
        }).$promise;
        campaignPromise.then(function(data) {
            var currentDateTime = new Date();
            var campaignCreationDateTime = new Date(data['date_added']);
            var campaignCreationDateTimeNextDay = new Date(data['date_added']);
            campaignCreationDateTimeNextDay.setDate(campaignCreationDateTime.getDate() + 1);
            if (campaignCreationDateTimeNextDay > currentDateTime) {
                toaster.pop('warning', "Aprcot Analytics",
                    "Sorry, the analytics will be available tomorrow. " +
                    "Waiting for you !");
            }
        });

        var campaignAnalyticsPromise = CampaignAnalytics.query({
            'campaign_id': campaignId
        }).$promise;
        campaignAnalyticsPromise.then(function(data) {
            _analyticsMainViewId = data[0]['main_view_id'];
        });

        var tokenPromise = AnalyticsToken.get().$promise;
        tokenPromise.then(function(response) {
            ngAnalyticsService.setServerToken(response['access_token']);
            drawCharts();
        });

        var drawCharts = function() {
            $scope.charts = [{
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions, ga:users',
                    dimensions: 'ga:date',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday',
                    ids: 'ga:' + _analyticsMainViewId
                },
                chart: {
                    container: 'chart-container-1',
                    type: 'BAR',
                    options: {
                        width: '100%'
                    }
                }
            }, {
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:browser',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday',
                    ids: 'ga:' + _analyticsMainViewId
                },
                chart: {
                    container: 'chart-container-2',
                    type: 'PIE',
                    options: {
                        width: '100%',
                        is3D: true,
                        title: 'Browser Usage'
                    }
                }
            }, {
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:operatingSystem',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday',
                    ids: 'ga:' + _analyticsMainViewId
                },
                chart: {
                    container: 'chart-container-3',
                    type: 'COLUMN',
                    options: {
                        width: '100%',
                        is3D: true,
                        title: 'Operating System'
                    }
                }
            }, {
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:operatingSystem',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday',
                    ids: 'ga:' + _analyticsMainViewId
                },
                chart: {
                    container: 'chart-container-4',
                    type: 'LINE',
                    options: {
                        width: '100%',
                        is3D: true,
                        title: 'Operating System'
                    }
                }
            }, {
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:mobileDeviceBranding',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday',
                    ids: 'ga:' + _analyticsMainViewId
                },
                chart: {
                    container: 'chart-container-5',
                    type: 'TABLE'
                }
            }, {
                reportType: 'ga',
                query: {
                    metrics: 'ga:sessions',
                    dimensions: 'ga:city',
                    'start-date': '30daysAgo',
                    'end-date': 'yesterday',
                    ids: 'ga:' + _analyticsMainViewId
                },
                chart: {
                    container: 'chart-container-6',
                    type: 'GEO'
                }
            }];
        };

        // $scope.$on('$viewContentLoaded', function(event){
        //     console.log(_analyticsMainViewId);
        //     $window.ga('create', 'UA-65390548-1', 'auto');
        //     $window.ga('send', 'pageview', { page: $location.url() });
        // });
        // $scope.hello = 'Hello world from the contoller';


        // $scope.queries = [{
        //     query: {
        //         ids: 'ga:105575841', // put your viewID here
        //         metrics: 'ga:avgSessionDuration',
        //         dimensions: 'ga:city'
        //     }
        // }];

        // if a report is ready
        // $scope.$on('$gaReportSuccess', function(e, report, element) {
        //     console.log(report, element);
        // });

    });
})();
