(function() {
  'use strict';
  var campaignModule = angular.module('aprcotApp.campaign.controllers');
  campaignModule.controller('listApplicationController', function(
    $rootScope, $scope,
    UserService, CampaignUtils, $state
  ) {
    $rootScope.$on('user:loggedIn', function() {
      $scope.isLoggedIn = UserService.isLoggedIn();
    });

    $scope.isLoggedIn = UserService.isLoggedIn();
    $scope.applications = $rootScope.APPLICATION_DATA;
    $scope.backgroundColors = ["#E47F7C","#DB917E","#ECB685","#E7CE8E","#7ED8B1","#7DCAD8","#79AFE0"];

    $scope.icons = ["fa-map-marker", "fa-clone", "fa-th", " fa-shopping-cart", "fa-puzzle-piece", " fa-map", "fa-heart"];
    $scope.appDescription = ['You can customize your own map by selecting multiple locations on the map and name them', 'You can customize your own memoryflip game by choosing the number of the game, the cards of the game and the images to be displayed', 'You can customize your popular 2048, by adding images that matched the numbered tiles for your campaign', 'You can create your own product catalogue, by adding products and customize their name,description, price, currency and image','You can create your own dynamic puzzle, by uploading a picture that will be cut down into Jiksaw pieces', 'You can create your own treasure hunt game, by customizing the map and the images that will be displayed on the map', 'You can create a photo or a video contest where your fans can like each others submissions'];



      var objectIndex = 0;
    _.object(_.map($scope.applications, function(app, key) {
      // var randomColorIndex = Math.floor(Math.random() * $scope.backgroundColors.length);
      app.backgroundColor = $scope.backgroundColors[objectIndex];
      app.icon = $scope.icons[objectIndex];
      app.description = $scope.appDescription[objectIndex];
      objectIndex++;
      return app;
    }));

    console.log("$scope.applications: ", $scope.applications);

    $scope.appAvailable = function (applicationId) {
      if (applicationId == "1" || applicationId == "22") {
        return true;
      }

        return false;
    };

    $scope.showDemo = function(applicationId) {
      CampaignUtils.viewDemo(applicationId);
    };

    $scope.createCampaign = function(applicationId) {
      if (applicationId === 22) {
        $state.go('treasurehunt_create');
      } else {
        CampaignUtils.create(applicationId);
      }
    };
  });
})();
