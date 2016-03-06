(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('retrieveTreasureHuntAppController', function($scope) {
    var imgWidth = $("#background-img").css("width").replace("px", '');
    var imgHeight = $("#background-img").css("height").replace("px", '');


    var board = {
      width: 20,
      height: 10
    };

    var components = [{
      "id": 1,
      "img": "/static/media/chest.png",
      "position": {
        "x": 1,
        "y": 1
      }
    }, {
      "id": 2,
      "img": "/static/media/bottle.png",
      "position": {
        "x": 2,
        "y": 2
      }
    }, {
      "id": 3,
      "img": "/static/media/bottle1.png",
      "position": {
        "x": 20,
        "y": 4
      }
    }, {
      "id": 4,
      "img": "/static/media/bottle2.png",
      "position": {
        "x": 12,
        "y": 8
      }
    }, {
      "id": 5,
      "img": "/static/media/bottle3.png",
      "position": {
        "x": 4,
        "y": 9
      }
    }];
    $scope.tileWidth = Math.floor(imgWidth / board.width);
    $scope.tileHeight = Math.floor(imgHeight / board.height);
    $scope.tileWidthPerc = Math.floor(100 / board.width);
    $scope.tileHeightPerc = Math.floor(100 / board.height);


    $scope.tiles = [];



    function Tile() {
      this.width = $scope.tileWidthPerc;
      this.height = $scope.tileHeightPerc;
      this.img = '';
      this.x = 0;
      this.y = 0;
    }
    for (var i = 0; i < board.width; i++) {
      for (var j = 0; j < board.height; j++) {
        var tile = new Tile();
        tile.x = i;
        tile.y = j;
        $scope.tiles.push(tile);
      }
    }

    components.forEach(function(component) {
      var tile = $scope.tiles[component.position.x * component.position.y + board.height];
      tile.img = component.img;
    });





  });





})();
