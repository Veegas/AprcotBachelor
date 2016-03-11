(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('createTreasureHuntAppController',
    function($scope, CampaignUtils, treasureHuntAppService, $timeout) {
      // applicationModule.controller('createTreasureHuntAppController', function($scope,
      // settings, treasureHuntAppService) {


      /* This is because the editor for now is a seperate route, once linked with the app route
       only settings to the function and uncomment default settings*/
      CampaignUtils.getDefaultSettings('22').then(function(settings) {
        $scope.settings = settings;
        $scope.backgroundImage = $scope.settings.background;
      });

      /*Default Demo Settings*/

      /*
            $scope.board = settings.board;
            $scope.components = settings.components;
      */


      $scope.uploads = {
        "background": "",
        "components": []
      };



      $scope.board = {
        "width": 20,
        "height": 10
      };
      $scope.components = [{
        "id": 1,
        "img": "/static/media/applications/treasurehunt/chest.png",
        "position": {
          "x": 9,
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
      $scope.tiles = treasureHuntAppService.getTiles();

      function backgroundSize() {
        return "cover";
      }

      $scope.backgroundSize = {
        "background-size": backgroundSize()
      };



      $scope.tileClicked = function tileClicked(tile) {
        console.log("Tile Clicked: ", tile);
        // if (tile.hasComponent) {
        //   treasureHuntAppService.removeComponentFromBoard(tile);
        // }
      };

      $scope.onDropComplete = function onDropComplete(source, event, target) {
        // var DropComplete = {source: source, event: event, target: target};
        // console.log("DropComplete: ", DropComplete);
        var tempComponent = JSON.parse(JSON.stringify(source.component));
        // console.log("tempComponent: ", tempComponent);
        tempComponent.position.x = target.x;
        tempComponent.position.y = target.y;

        $scope.components.push(tempComponent);
        treasureHuntAppService.putComponentsOnBoard($scope.components);


        // console.log($scope.components);
          $scope.findOccupiedTiles();
      };

      $scope.findOccupiedTiles = function findOccupiedTiles() {
        var occupied = $scope.tiles.filter(function(tile) {
          return !_.isEmpty(tile.component);
        });
        console.log("occupied: ", occupied);

        // console.log("lodash: ", _);
      };

      // $scope.onDragComplete = function onDragComplete(source, event, target) {
      //   // console.log("event DragComplete: ", event);
      //   // console.log("target DragComplete: ", target);
      //   source.hasComponent = false;
      //   source.img = '';
      //   var DragComplete = {
      //     source: source,
      //     event: event,
      //     target: target
      //   };
      //   console.log("DragComplete: ", DragComplete);
      // };

      $scope.$watch('board', function(newBoard) {
        treasureHuntAppService.initBoard(newBoard, $scope.components);
        $scope.tiles = treasureHuntAppService.getTiles();
      }, true);



      // render the image in our view
      $scope.renderBackground = function renderBackground(file) {

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(event) {
          var url = event.target.result;
          $scope.backgroundImage = url;
          $scope.$apply();
        };


      };
      $scope.renderComponents = function renderComponents(file) {

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(event) {
          var url = event.target.result;
          var component = {
            "id": $scope.components.length + 1,
            "img": url,
            "position": {
              "x": 0,
              "y": 0
            }
          };
          $scope.components.push(component);
        };
        $scope.$apply();
        console.log($scope.components);
      };

      $scope.showBackgroundMenu = function showBackgroundMenu() {
        $scope.componentsMenu = false;
      };

      $scope.showComponentsMenu = function showComponentsMenu() {
        $scope.componentsMenu = true;
      };



    });
})();
