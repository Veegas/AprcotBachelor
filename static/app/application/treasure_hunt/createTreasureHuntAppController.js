(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('createTreasureHuntAppController',
    function($scope, CampaignUtils, treasureHuntAppService) {
      // applicationModule.controller('createTreasureHuntAppController', function($scope,
      // settings, treasureHuntAppService) {


      CampaignUtils.getDefaultSettings('22').then(function(settings) {
        $scope.settings = settings;
        $scope.backgroundImage = $scope.settings.background;
      });


      //  Default Demo Settings
      // $scope.board = settings.board;
      // $scope.components = settings.components;


      // console.log("INITIAL background: ", $scope.settings);

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



      $scope.tileClicked = function tileClicked(tile) {
        console.log("Tile Clicked: ", tile);
        // if (tile.hasComponent) {
        //   treasureHuntAppService.removeComponentFromBoard(tile);
        // }
      };

      $scope.onDropComplete = function onDropComplete(source, event, target) {
        var targetIndex = $scope.tiles.indexOf(target);
        target.hasComponent = true;
        target.img = source.img;
        $scope.tiles[targetIndex] = target;
        $scope.findOccupiedTiles();
        // var DropComplete = {source: source, event: event, target: target};
        // console.log("DropComplete: ", DropComplete);
      };

      $scope.findOccupiedTiles = function findOccupiedTiles() {
          var occupied = $scope.tiles.filter(function (tile) {
              return tile.img !== '';
          });
          console.log("occupied: ", occupied);
      };

      $scope.onDragComplete = function onDragComplete(source, event, target) {
        // console.log("event DragComplete: ", event);
        // console.log("target DragComplete: ", target);
        source.hasComponent = false;
        source.img = '';
        var DragComplete = {
          source: source,
          event: event,
          target: target
        };
        console.log("DragComplete: ", DragComplete);
      };

      $scope.$watch('board', function(newBoard) {
        treasureHuntAppService.initBoard(newBoard, $scope.components);
        $scope.tiles = treasureHuntAppService.getTiles();
      }, true);



      // render the image in our view
      function renderImage(file) {

        // generate a new FileReader object
        var reader = new FileReader();

        // inject an image with the src url
        reader.onload = function(event) {
          var url = event.target.result;
          $scope.backgroundImage = url;
          $scope.$apply();
        };

        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(file);
      }

      $("#background-upload").change(function() {
        renderImage(this.files[0]);
      });



    });
})();
