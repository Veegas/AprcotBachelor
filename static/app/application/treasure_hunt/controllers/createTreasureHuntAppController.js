(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('createTreasureHuntAppController',
    function($rootScope, $scope, CampaignUtils, treasureHuntAppService, $timeout, imgur ) {
      // applicationModule.controller('createTreasureHuntAppController', function($scope,
      // settings, treasureHuntAppService) {
      $scope.settings = {};
      /* This is because the editor for now is a seperate route, once linked with the app route
       only settings to the function and uncomment default settings*/
      CampaignUtils.getDefaultSettings('22').then(function(settings) {
        $scope.settings = settings;
        customizedDefaultSettings();
        $scope.identifier = $rootScope.APPLICATION_DATA[settings.application_id].identifier;
      //
      //
      //
      //   /*Default Demo Settings*/
      //
      //   /*      $scope.backgroundImage = $scope.settings.background;
      //           $scope.board = settings.board;
      //           $scope.components = settings.components;
      //   */
      //   // treasureHuntAppService.initBoard($scope.board, $scope.components);
      //   // $scope.tiles = treasureHuntAppService.getTiles();
      //
      });

      function customizedDefaultSettings() {
        $scope.uploads = {
          "background": "",
          "components": []
        };
        $scope.name = "Treasure Hunt";
        $scope.heading = "WHAT THE HELL MAN";
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



      function backgroundSize() {
        return "cover";
      }

      $scope.backgroundSize = {
        "background-size": backgroundSize(),
        "background-image": 'url(' + $scope.settings.background + ')'
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
        console.log("$SCOPE CANVAS", $scope.canvas);
        console.log("component: ", $scope.components[0]);
        var positionX = Math.floor(event.x - $scope.canvas._offset.left);
        var positionY = Math.floor(event.y - $scope.canvas._offset.top);
        var percentageX = Math.floor((positionX / $scope.canvas.width) * 100);
        var percentageY = Math.floor((positionY / $scope.canvas.height) * 100);
        var newComponent = {
            position: {
              x: percentageX,
              y: percentageY
            },
            angle: 0,
            id: source.id,
            img: source.img,
            size: {
              width: 35,
              height: 50
            }
        };

        $scope.components.push(newComponent);
        treasureHuntAppService.pushComponents($scope.components);
        $scope.$apply();
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




      // render the image in our view
      $scope.renderBackground = function renderBackground(file) {
        imgur.upload(file).then(function then(model) {
          console.log('Your adorable cat be here: ' + model.link);
        });
      };
      $scope.renderComponents = function renderComponents(file) {

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(event) {
          var url = event.target.result;
          var component = {
            "id": $scope.components.length + 1,
            "img": url
          };
          // $scope.uploads.components.push(component);
          $scope.components.push(component);
          treasureHuntAppService.pushComponents($scope.components);
          $scope.$apply();
        };
      };

      $scope.showBackgroundMenu = function showBackgroundMenu() {
        $scope.componentsMenu = false;
      };

      $scope.showComponentsMenu = function showComponentsMenu() {
        $scope.componentsMenu = true;
      };

      $scope.saveSettings = function saveSettings() {
        $scope.settings.components = $scope.components;

        var settings = $scope.settings;
        settings.form_fields = settings.form_fields[0];
        console.log("CAMPAIGN SETTINGS TO BE SAVE: ", settings);
        debugger;
        CampaignUtils.createCampaign(settings, settings.application_id);

      };


    });
})();
