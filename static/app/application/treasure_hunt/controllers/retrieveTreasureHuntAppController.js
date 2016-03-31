(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('retrieveTreasureHuntAppController', function($scope, settings, treasureHuntAppService) {


    $scope.settings = settings;

//  Default Demo Settings
    // $scope.board = settings.board;
    // $scope.components = settings.components;

    $scope.board = {
      "width": 20,
      "height": 10
    };
    $scope.components = [{
      "id": 1,
      "img": "/static/media/applications/treasurehunt/chest.png",
      "position": {
        "x":  9,
        "y": 9
      }
    }, {
      "id": 2,
      "img": "/static/media/applications/treasurehunt/bottle.png",
      "position": {
        "x": 0,
        "y": 9
      }
    }, {
      "id": 3,
      "img": "/static/media/applications/treasurehunt/bottle1.png",
      "position": {
        "x": 5,
        "y": 5
      }
    }, {
      "id": 4,
      "img": "/static/media/applications/treasurehunt/bottle2.png",
      "position": {
        "x": 8,
        "y": 3
      }
    }, {
      "id": 5,
      "img": "/static/media/applications/treasurehunt/bottle3.png",
      "position": {
        "x": 0,
        "y": 4
      }
    }];



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
      "background-image": 'url(' + $scope.settings.backgroundImage + ')'
    };

  });



})();
