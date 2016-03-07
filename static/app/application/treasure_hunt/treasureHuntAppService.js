(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.services');
  applicationModule.service('treasureHuntAppService', function() {
    var treasureHunt = this;
    this.tiles = [];
    this.board = {
      width: 1,
      height: 1
    };
    this.tileWidthPerc = 0;
    this.tileHeightPerc = 0;


    function Tile() {

      this.width = treasureHunt.tileWidthPerc;
      this.height = treasureHunt.tileHeightPerc;

      this.img = '';
      this.x = 0;
      this.y = 0;
      this.hasComponent = false;
    }

    this.getTiles = function getTiles() {
      return this.tiles;
    };

    this.initBoard = function initBoard(boardSettings, boardComponents) {
      this.board.width = boardSettings.width;
      this.board.height = boardSettings.height;
      this.tileWidthPerc = 100 / this.board.width;
      this.tileHeightPerc = 100 / this.board.height;

      this.splitBoardToTiles();
      this.putComponentsOnBoard(boardComponents);
    };

    this.putComponentsOnBoard = function putComponentsOnBoard(components) {
      components.forEach(function(component) {
        var tile = treasureHunt.tiles[component.position.y + component.position.x * treasureHunt.board.width];
        if (tile) {
          tile.img = component.img;
          tile.hasComponent = true;
          treasureHunt.tiles[component.position.y + component.position.x * treasureHunt.board.width] = tile;
        }
      });
    };

    this.removeComponentFromBoard = function removeComponentFromBoard(tile) {
      var foundTileIndex = this.tiles.indexOf(tile);
      this.tiles[foundTileIndex].img = '';
    };

    this.splitBoardToTiles = function splitBoardToTiles() {
      var tiles = [];
      for (var i = 0; i < this.board.width; i++) {
        for (var j = 0; j < this.board.height; j++) {
          var tile = new Tile();
          tile.y = j;
          tile.x = i;
          tiles.push(tile);
        }
      }
      this.tiles = tiles;
    };


  });
})();
