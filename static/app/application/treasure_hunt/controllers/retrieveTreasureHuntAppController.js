(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('retrieveTreasureHuntAppController', function($scope, settings, treasureHuntAppService) {



    //  Default Demo Settings
    // $scope.settings = settings;
    // $scope.board = settings.board;
    // $scope.components = settings.components;
    $scope.settings = {
      "application_id": 22,
      "description": "Find the Treasure",
      "components": [{
        "id": 1,
        "name": "Treasure Chest",
        "img": "/static/media/applications/treasurehunt/chest.png",
        "position": {
          "x": 1162,
          "y": 389
        },
        "size": {
          "width": 47,
          "height": 39
        },
        "angle": 0,
        "$$hashKey": "object:11"
      }, {
        "id": 2,
        "name": "Red Bottle",
        "img": "/static/media/applications/treasurehunt/bottle4.png",
        "position": {
          "x": 165,
          "y": 370
        },
        "size": {
          "width": 28,
          "height": 41
        },
        "angle": 0,
        "$$hashKey": "object:12"
      }, {
        "id": 3,
        "name": "Green Bottle",
        "img": "/static/media/applications/treasurehunt/bottle2.png",
        "position": {
          "x": 54,
          "y": 21
        },
        "size": {
          "width": 23,
          "height": 32
        },
        "angle": 0,
        "$$hashKey": "object:13"
      }, {
        "id": 4,
        "name": "Black Bottle",
        "img": "/static/media/applications/treasurehunt/bottle3.png",
        "position": {
          "x": 26,
          "y": 249
        },
        "size": {
          "width": 25,
          "height": 36
        },
        "angle": 0,
        "$$hashKey": "object:14"
      }],
      "form_fields": {
        "field_id": 1,
        "field_required": true,
        "field_title": "score",
        "field_type": "integer"
      },
      "board": {
        "width": 4,
        "height": 4
      },
      "background": "/static/media/applications/treasurehunt/background.jpg",
      "heading": "Treasure Hunt"
    };
    $scope.board = $scope.settings.board;
    $scope.components = $scope.settings.components;



    treasureHuntAppService.initBoard($scope.board, $scope.components);
    // treasureHuntAppService.putComponentsOnBoard($scope.components);
    $scope.tiles = treasureHuntAppService.getTiles();

    $scope.tileClicked = function tileClicked(tile) {
      if (tile.hasComponent) {
        treasureHuntAppService.removeComponentFromBoard(tile);
      }
    };

    $scope.backgroundStyle = {
      "background-size": 'cover',
      "background-image": 'url(' + $scope.settings.background + ')'
    };

  });



})();
