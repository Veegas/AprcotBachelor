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
    this.tiles = [];

    function Tile(x, y, component) {

      this.width = treasureHunt.tileWidthPerc;
      this.height = treasureHunt.tileHeightPerc;

      this.hasComponent = true;
      this.component = component;
      this.x = x;
      this.y = y;
      this.left = (this.x / treasureHunt.board.width) * 100;
      this.top = (this.y / treasureHunt.board.height) * 100;

    }

    this.getTiles = function getTiles() {
      return this.tiles;
    };

    this.initBoard = function initBoard(boardSettings, boardComponents) {
      this.board.width = boardSettings.width;
      this.board.height = boardSettings.height;
      this.tileWidthPerc = 100 / this.board.width;
      this.tileHeightPerc = 100 / this.board.height;

      // this.splitBoardToTiles();
      this.putComponentsOnBoard(boardComponents);
    };

    this.putComponentsOnBoard = function putComponentsOnBoard(components) {
      treasureHunt.components = components;
      components.forEach(function(component) {
        var tile = new Tile(component.position.x, component.position.y, component);
        treasureHunt.tiles.push(tile);
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
