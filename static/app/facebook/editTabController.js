(function() {
    'use strict';
    var facebookModule = angular.module('aprcotApp.facebook.controllers');
    facebookModule.controller('editTabController', function($scope, $modalInstance, $filter,
        pageId, tab, FacebookPageTab, FacebookPageTabs) {

        /* Getting all page tabs from facebook in order to have the length. */
        var facebookPageTabsPromise = FacebookPageTabs.query({
            'page_id': pageId
        }).$promise;
        facebookPageTabsPromise.then(function(tabs) {
            $scope.facebookTabs = $filter('orderBy')(tabs, 'position');
        });

        /* Updating tab data before Edit. */
        var facebookPageTabPromise = FacebookPageTab.get({
            'page_id': pageId,
            'tab_id': tab.id
        }).$promise;
        facebookPageTabPromise.then(function(tabResponse) {
            $scope.tab = tabResponse;
        });

        $scope.closeModal = function() {
            $modalInstance.dismiss('canceled');
        };
        $scope.saveTab = function() {
            $scope.tab.$update({
                'page_id': pageId,
                'tab_id': $scope.tab.id
            });
            $modalInstance.close({
                'state': 'edited',
                'id': $scope.tab.id
            });
        };
        $scope.deleteTab = function() {
            $scope.tab.$remove({
                'page_id': pageId,
                'tab_id': $scope.tab.id
            });
            $modalInstance.close({
                'state': 'deleted',
                'id': $scope.tab.id
            });
        };
    });

})();
