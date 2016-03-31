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



        /*Default Demo Settings*/

        /*      $scope.backgroundImage = $scope.settings.background;
                $scope.board = settings.board;
                $scope.components = settings.components;
        */
        treasureHuntAppService.initBoard($scope.board, $scope.components);
        $scope.tiles = treasureHuntAppService.getTiles();

      });



      $scope.uploads = {
        "background": "",
        "components": []
      };


      $scope.backgroundImage = "/static/media/applications/treasurehunt/background.jpg";
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
          "x": 15,
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



      function backgroundSize() {
        return "cover";
      }

      $scope.backgroundSize = {
        "background-size": backgroundSize(),
        "background-image": 'url(' + $scope.backgroundImage + ')'
      };



      $scope.tileClicked = function tileClicked(tile) {
        console.log("Tile Clicked: ", tile);
        // if (tile.hasComponent) {
        //   treasureHuntAppService.removeComponentFromBoard(tile);
        // }
      };

      $scope.onDropComplete = function onDropComplete(source, event, target) {
        var DropComplete = {
          source: source,
          event: event,
          target: target
        };
        console.log("DropComplete: ", DropComplete);
        // var tempComponent = JSON.parse(JSON.stringify(source.component));
        // // console.log("tempComponent: ", tempComponent);
        // tempComponent.position.x = target.x;
        // tempComponent.position.y = target.y;
        //
        // $scope.components.push(tempComponent);
        // treasureHuntAppService.putComponentsOnBoard($scope.components);
        //
        //
        // // console.log($scope.components);
        //   $scope.findOccupiedTiles();
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
          $scope.$apply();
          $scope.drawComponents($scope.components);
          console.log($scope.components);
        };
      };

      $scope.showBackgroundMenu = function showBackgroundMenu() {
        $scope.componentsMenu = false;
      };

      $scope.showComponentsMenu = function showComponentsMenu() {
        $scope.componentsMenu = true;
      };

      $scope.saveSettings = function saveSettings() {
        var settings = $scope.settings;
        settings.form_fields = settings.form_fields[0];
        CampaignUtils.createCampaign(settings, settings.application_id);

      };


    });
})();
