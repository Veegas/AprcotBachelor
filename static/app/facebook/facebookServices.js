(function() {
    'use strict';
    var facebookModule = angular.module('aprcotApp.facebook.services');
    facebookModule.factory('AccessToken', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/access_token/');
        }
    ]);
    facebookModule.factory('FacebookPage', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/page/:pk/', {
                'pk': '@pk'
            }, {
                'update': {
                    method: 'PUT'
                },
                'save': {
                    method: 'POST',
                    url: 'https://guc.aprcot.com/api/page/'
                }
            });
        }
    ]);
    facebookModule.factory('FacebookPages', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/facebook/pages/');
        }
    ]);
    facebookModule.factory('AprcotCampaign', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/campaign/:pk/', {
                'pk': '@pk'
            }, {
                'update': {
                    method: 'PUT'
                }
            });
        }
    ]);
    facebookModule.factory('FacebookPageTab', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/page/:page_id/tab/:tab_id/', {
                'page_id': '@page_id',
                'tab_id': '@tab_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
    facebookModule.factory('FacebookPageTabs', [
        '$resource',
        function($resource) {
            return $resource('https://guc.aprcot.com/api/page/:page_id/tab/', {
                'page_id': '@page_id'
            });
        }
    ]);
})();
