(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.controllers');
  applicationModule.controller('createTreasureHuntAppController',
    function($rootScope, $scope, CampaignUtils, treasureHuntAppService, $timeout, imgur, $filter) {
      // applicationModule.controller('createTreasureHuntAppController', function($scope,
      // settings, treasureHuntAppService) {
      $scope.settings = {};
      /* This is because the editor for now is a seperate route, once linked with the app route
       only settings to the function and uncomment default settings*/
      CampaignUtils.getDefaultSettings('22').then(function(settings) {
        $scope.settings = settings;
        $scope.components = settings.components;
        $scope.heading = settings.heading;
        $scope.name = settings.name;
        $scope.componentsAddStart = 0;
        console.log("settings: ", settings);
        $scope.identifier = $rootScope.APPLICATION_DATA[settings.application_id].identifier;
        // customizedDefaultSettings();
        treasureHuntAppService.pushComponents($scope.components);
        $scope.$watch( function() {
            return treasureHuntAppService.getComponents();
          },
          function(components) {
            $scope.components = components;
          },true);
        $scope.$watch( function() {
            return treasureHuntAppService.getActiveComponent();
          },
          function(component) {
            console.log("Active component Changed: ", component);
            $scope.activeComponent = component;
          },true);
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
      }



      function backgroundSize() {
        return "cover";
      }

      $scope.backgroundSize = {
        "background-size": backgroundSize(),
        "background-image": 'url(' + $scope.settings.background + ')'
      };

      $scope.activeComponent = null;
      // {
      //   "name":
      //   "img":
      //   "position": {
      //     "x":
      //     "y":
      //   },
      //   "size": {
      //     "height":
      //     "width":
      //   },
      //   "angle":
      // };

      $scope.activateComponent = function activateComponent(component) {
        treasureHuntAppService.pushActiveComponent(component);
        $scope.activeComponent = component;
      };

      $scope.deleteComponent = function deleteComponent(component) {
        var found = $filter('filter')($scope.components, {
          id: component.id
        }, true);

        $scope.components = _.without($scope.components, found[0]);
        $scope.confirmComponent();
        treasureHuntAppService.pushComponents($scope.components);
        console.log("components deleted: ", $scope.components);

      };

      $scope.confirmComponent = function confirmComponent() {
        $scope.activeComponent = null;
      };

      $scope.decideBorderColor = function decideBorderColor(index) {
        var baseClassName = "component-color-";
        var colorNumber = index % 4;
        return baseClassName + colorNumber;
      };

      $scope.$watch('components', function watchComponents(components) {
        treasureHuntAppService.pushComponents(components);
        console.log("components PUSHED TO SERVICE : ", components);
      }, true);

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
        $rootScope.apply();
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

        var reader = new FileReader();
        reader.readAsDataURL(file);

        imgur.upload(file).then(function (image) {
          $scope.settings.background = image.link;
          console.log("settings after image uploaded: ", $scope.settings);
        });
// To read as data url until promise is resolved
        reader.onload = function(event) {
          var url = event.target.result;
          $scope.settings.background = url;
          $rootScope.apply();
        };


      };
      $scope.renderComponents = function renderComponents(file) {
        imgur.upload(file).then(function (image) {
            var component = {
              "id": $scope.components.length + 1,
              "img": image.link,
              "position": {
                x: 50,
                y: 50
              },
              angle: 0,
              size: {
                width: 35,
                height: 50
              }
            };
            // $scope.uploads.components.push(component);
            $scope.components.push(component);
            $scope.activeComponent = component;
            $rootScope.apply();
        });
      };

      $scope.showBackgroundMenu = function showBackgroundMenu() {
        $scope.componentsMenu = false;
      };

      $scope.menuBackgroundColor = function menuBackgroundColor() {
        if (!$scope.componentsMenu) {
          return "menu-orange-active";
        } else {
          return '';
        }
      };
      $scope.menuComponentColor = function menuComponentColor() {
        if ($scope.componentsMenu) {
          return "menu-yellow-active";
        } else {
          return '';
        }
      };

      $scope.showComponentsMenu = function showComponentsMenu() {
        $scope.componentsMenu = true;
      };

      $scope.componentsMenuPage = function componentsNextMenuPage(item) {
        if (item < 0) {
            if ($scope.componentsAddStart > 0) {
              $scope.componentsAddStart += item;
            }
        } else {
          if ($scope.componentsAddStart + 4 < $scope.components.length) {
            $scope.componentsAddStart += item;
          }

        }
        console.log("componentsAddStart: ", $scope.componentsAddStart);
      }

      $scope.saveSettings = function saveSettings() {
        $scope.settings.components = $scope.components;

        var settings = $scope.settings;
        settings.form_fields = settings.form_fields[0];
        CampaignUtils.createCampaign(settings, settings.application_id);

      };


    });
})();
