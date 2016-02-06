(function() {
    'use strict';
    var facebookModule = angular.module('aprcotApp.facebook.controllers');
    facebookModule.controller('retrievePageController', function($scope, $modal, $stateParams,
        FacebookPages, FacebookPageTab) {
        $scope.tabs = [];
        var facebookPagePromise = FacebookPages.get().$promise;
        var facebookPageTabPromise = FacebookPageTab.query({
            'page_id': $stateParams.pageId
        }).$promise;

        facebookPagePromise.then(function(response) {
            if (response && response.pages) {
                var pages = response.pages;
                var pageId = $stateParams.pageId;
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i]['id'] === pageId) {
                        $scope.page = pages[i];
                        break;
                    }
                }
            }
        });
        facebookPageTabPromise.then(function(response) {
            angular.forEach(response, function(item) {
                var itemDate = new Date(item['date_added']);
                item['date_added'] = itemDate.toDateString();
                $scope.tabs.push(item);
            });
        });
        $scope.createTab = function() {
            var modalInstance = $modal.open({
                templateUrl: '/static/app/facebook/addTabView.html',
                controller: 'addTabController',
                resolve: {
                    pageId: function() {
                        return $stateParams.pageId;
                    }
                }
            });
            modalInstance.result.then(function(tabState) {
                if (tabState.state === 'created') {
                    $scope.tabs.push(tabState.tab);
                }
            }, function() {});
        };
        $scope.editTab = function(tabId) {
            var modalInstance = $modal.open({
                templateUrl: '/static/app/facebook/editTabView.html',
                controller: 'editTabController',
                resolve: {
                    tab: function() {
                        return _.findWhere($scope.tabs, {
                            id: tabId
                        });
                    },
                    pageId: function() {
                        return $stateParams.pageId;
                    }
                }
            });
            modalInstance.result.then(function(tabState) {
                if (tabState.state === 'deleted') {
                    $scope.tabs = _.without($scope.tabs, _.findWhere($scope.tabs, {
                        id: tabState.id
                    }));
                }
            }, function() {});
        };
    });

})();
