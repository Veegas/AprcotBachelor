(function() {
    'use strict';
    var root = angular.module('aprcotApp');

    root.config(function($stateProvider, $urlRouterProvider) {
        var APPS_DIR = '/static/app/application/';
        // Set root route to index, if no other routes exist
        $urlRouterProvider.otherwise('home');

        // Set the default empty route to home
        $urlRouterProvider.when('', 'home');

        $stateProvider
            .state('index', {
                url: '',
                abstract: true,
                views: {
                    header: {
                        templateUrl: '/static/app/common/partials/headerView.html',
                        controller: 'headerController'
                    },
                    nav: {
                        templateUrl: '/static/app/common/partials/navigationView.html',
                        controller: 'navigationController'
                    },
                    footer: {
                        templateUrl: '/static/app/common/partials/footerView.html',
                    },
                }
            })
            .state('index.home', {
                url: '/home',
                views: {
                    'content@': {
                        controller: 'homeController',
                        templateUrl: '/static/app/home/homeView.html'
                    }
                }
            })
            .state('index.page', {
                url: '/page/:pageId',
                views: {
                    'content@': {
                        controller: 'retrievePageController',
                        templateUrl: '/static/app/facebook/retrievePageView.html'
                    }
                }
            })
            .state('index.campaign', {
                url: '/campaign',
                views: {
                    'content@': {
                        controller: 'listCampaignController',
                        templateUrl: '/static/app/campaign/listCampaignView.html'
                    }
                },
            })
            .state('index.analytics', {
                url: '/campaign/{campaignId:[0-9]{1,8}}/analytics',
                views: {
                    'content@': {
                        controller: 'retrieveAnalyticsController',
                        templateUrl: '/static/app/analytics/retrieveAnalyticsView.html'
                    }
                }
            })
            .state('index.results', {
                url: '/campaign/{campaignId:[0-9]{1,8}}/results',
                views: {
                    'content@': {
                        controller: 'campaignResultsController',
                        templateUrl: '/static/app/campaign/retrieveCampaignResultsView.html'
                    }
                }
            })
            .state('index.application', {
                url: '/application',
                views: {
                    'content@': {
                        templateUrl: '/static/app/application/listApplicationView.html',
                        controller: 'listApplicationController'
                    }
                },
            })
            .state('index.contact', {
                url: '/contact',
                views: {
                    'content@': {
                        controller: 'contactController',
                        templateUrl: '/static/app/contact/contactView.html'
                    }
                }
            })
            .state('index.payment', {
                url: '/payment',
                views: {
                    'content@': {
                        controller: 'paymentController',
                        templateUrl: '/static/app/payment/paymentView.html'
                    }
                }
            })
            .state('index.images', {
                url: '/images',
                views: {
                    'content@': {
                        controller: 'listFilesController',
                        templateUrl: '/static/app/common/fileupload/listFilesView.html'
                    }
                }
            })
            // APRCOT applications routes
            .state('campaignView', {
                url: '/campaign/{campaignId:[0-9]{1,8}}',
                views: {
                    'content@': {
                        controller: 'campaignController',
                    }
                },
            })
            .state('addTab', {
                views: {
                    'content@': {
                        controller: 'addTabController',
                        templateUrl: '/static/app/facebook/addTabView.html'
                    }
                },
            })
            .state('app', {
                url: '/app',
                abstract: true,
                params: {
                    settings: {},
                    campaignId: undefined
                },
                resolve: {
                    settings: function($stateParams) {
                        return $stateParams.settings;
                    },
                    campaignId: undefined
                }
            })
            .state('app.geolocation', {
                url: '/geolocation',
                views: {
                    'content@': {
                        controller: 'retrieveGeolocationAppController',
                        templateUrl: APPS_DIR + 'geolocation/retrieveGeolocationAppView.html'
                    }
                }
            })
            .state('app.geolocation_create', {
                url: '/geolocation',
                views: {
                    'content@': {
                        controller: 'createGeolocationAppController',
                        templateUrl: APPS_DIR + 'geolocation/createGeolocationAppView.html'
                    }
                }
            })
            .state('app.dynamicpuzzle', {
                url: '/dynamicPuzzle',
                views: {
                    'content@': {
                      controller: 'retrieveDynamicPuzzleAppController',
                      templateUrl: APPS_DIR + 'dynamic_puzzle/retrieveDynamicPuzzleAppView.html'
                    }
                }
            });
    });
})();
