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

      this.component = {};
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
      treasureHunt.components = components;
      components.forEach(function(component) {
        var tile = treasureHunt.tiles[component.position.x + component.position.y * treasureHunt.board.width];
        if (tile) {
          tile.component = component;
          tile.hasComponent = true;
        }
      });
    };

    this.removeComponentFromBoard = function removeComponentFromBoard(tile) {
      // var foundTileIndex = this.tiles.indexOf(tile);
      console.log("tile to be removed: ", tile);
      treasureHunt.components = treasureHunt.components.filter(function (component) {
        return component.position.x !== tile.x || component.position.y !== tile.y;
      });

      console.log("treasureHunt.components: ", treasureHunt.components);
      this.putComponentsOnBoard(treasureHunt.components);

    };

    this.splitBoardToTiles = function splitBoardToTiles() {
      var tiles = [];
      for (var i = 0; i < this.board.height; i++) {
        for (var j = 0; j < this.board.width; j++) {
          var tile = new Tile();
          tile.y = i;
          tile.x = j;
          tiles.push(tile);
        }
      }
      this.tiles = tiles;
    };


  });
})();
