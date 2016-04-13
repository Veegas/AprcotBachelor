(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('retrieveTreasureHuntAppController', function($scope, settings, treasureHuntAppService) {



    //  Default Demo Settings
    // $scope.settings = settings;
    // $scope.board = settings.board;
    // $scope.components = settings.components;
    function customizedDefaultSettings() {
      $scope.uploads = {
        "background": "",
        "components": []
      };
      $scope.settings.background = "/static/media/applications/treasurehunt/background.jpg";
      $scope.board = {
        "width": 4,
        "height": 4
      };
      $scope.components = [{
        "id": 1,
        "name": "Treasure Chest",
        "img": "/static/media/applications/treasurehunt/chest.png",
        "position": {
          "x": 50,
          "y": 0
        },
        "size": {
          "height": 50,
          "width": 35
        },
        "angle": 0
      }, {
        "id": 2,
        "name": "Red Bottle",
        "img": "/static/media/applications/treasurehunt/bottle4.png",
        "position": {
          "x": 50,
          "y": 50
        },
        "size": {
          "height": 50,
          "width": 35
        },
        "angle": 0
      }, {
        "id": 3,
        "name": "Green Bottle",
        "img": "/static/media/applications/treasurehunt/bottle2.png",
        "position": {
          "x": 0,
          "y": 1
        },
        "size": {
          "height": 50,
          "width": 35
        },
        "angle": 0
      }, {
        "id": 4,
        "name": "Black Bottle",
        "img": "/static/media/applications/treasurehunt/bottle3.png",
        "position": {
          "x": 70,
          "y": 20
        },
        "size": {
          "height": 50,
          "width": 35
        },
        "angle": 0
      }];

      treasureHuntAppService.pushComponents($scope.components);
    }

      function getServerSettings() {
          $scope.components = $scope.settings.components;
          console.log("components: ", $scope.components);
          treasureHuntAppService.pushComponents($scope.components);
      }
        $scope.settings = settings;
        getServerSettings();
        // customizedDefaultSettings();

    $scope.backgroundStyle = {
      "background-size": 'cover',
      "background-image": 'url(' + $scope.settings.background + ')'
    };

  });



})();
