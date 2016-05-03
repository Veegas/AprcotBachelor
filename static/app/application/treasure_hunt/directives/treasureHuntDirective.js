/*globals fabric, alert */

(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.directives');

  applicationModule.directive('treasureHuntDirective', function($rootScope, treasureHuntAppService, $filter) {


    function link($scope, element, attrs) {
      var editor;
      if (attrs.editor === "false") {
        editor = false;
      } else {
        editor = true;
      }

      $scope.$watch('components', function(components) {
        treasureHuntAppService.pushComponents(components);
      }, true);


      function canvasInit() {
        var canvas = new fabric.Canvas(attrs.id, {
          width: element.parent().width(),
          height: element.parent().height(),
        });
        $scope.canvas = canvas;
        if (editor) {
          treasureHuntEditorHandlers(canvas);
        } else {
          treasureHuntPlayableHandlers(canvas);
        }
      }

      $(document).ready(function() {
        canvasInit();
      });


      function setCanvasBackground(canvas, backgroundImage) {
        canvas.setBackgroundImage(backgroundImage, canvas.renderAll.bind(canvas), {
          width: canvas.width,
          height: canvas.height,
          originX: 'left',
          originY: 'top'
        });
      }


      function addComponentToCanvas(canvas, component) {
        var img = new Image(); // Create new img element
        img.src = component.img;
        var imgLeftPixels = Math.floor((canvas.width * component.position.x) / 100);
        var imgTopPixels = Math.floor((canvas.height * component.position.y) / 100);
        img.onload = function() {
          var imgInstance = new fabric.Image(img, {
            left: imgLeftPixels,
            top: imgTopPixels,
            width: component.size.width,
            height: component.size.height,
            angle: component.angle,
            selectable: editor,
            crossOrigin: 'anonymous',
            component: component
          });
          canvas.add(imgInstance);
        };
      }


      function drawComponents(canvas, components) {
        canvas.clear();
        components.forEach(function(component) {
          addComponentToCanvas(canvas, component);
        });
      }


      function pixelsToPercentage(pixels, total) {
        var percent = (pixels / total) * 100;
        return Math.floor(percent);
      }


      function scaleToOriginal(original, scale) {
        return Math.floor(original * scale);
      }


      function treasureHuntEditorHandlers(canvas) {
        // $rootScope.$on("component-added", function(event, args) {
        //   drawComponents(canvas, args.diffComponents);
        // });

        $scope.$watch('settings.background', function(newImage) {
          setCanvasBackground(canvas, newImage);
        });

        $scope.$watch(
          function() {
            return treasureHuntAppService.getComponents();
          },
          function(components) {
            $scope.components = components;
            console.log("SERVICE COMPONETNS CHANGED DRAW: ", components);
            drawComponents(canvas, $scope.components);
          },
          true
        );

        canvas.on('object:modified', function(e) {
          var activeObject = e.target;
          var activeComponent = activeObject.component;
          var found = $filter('filter')($scope.components, {
            $$hashKey: activeComponent.$$hashKey
          }, true)[0];
          found.position.x = pixelsToPercentage(activeObject.left, canvas.getWidth());
          found.position.y = pixelsToPercentage(activeObject.top, canvas.getHeight());
          found.size.width = scaleToOriginal(activeObject.width, activeObject.scaleX);
          found.size.height = scaleToOriginal(activeObject.height, activeObject.scaleY);
          found.angle = Math.floor(activeObject.angle);
          treasureHuntAppService.pushComponents($scope.components);
          $rootScope.safeApply();

        });

        canvas.on('object:selected', function(e) {
          $scope.activeComponent = e.target.component;
          treasureHuntAppService.pushActiveComponent(e.target.component);
          $rootScope.safeApply();
        });

      }


      function treasureHuntPlayableHandlers(canvas) {
        $scope.$watch(
          function() {
            return treasureHuntAppService.getComponents();
          },
          function(components) {
            $scope.components = components;
            drawComponents(canvas, $scope.components);
          },
          true
        );

        canvas.on('mouse:down', function(options) {
          if (!_.isUndefined(options.target)) {
            console.log("OPTIONS TARGET: ", options.target);
            $scope.components = _.without($scope.components,
              _.findWhere($scope.components, {
                position: options.target.component.position
              }));
            treasureHuntAppService.pushComponents($scope.components);
            options.target.remove();
            if (_.isEmpty($scope.components)) {
              $scope.$broadcast("treasurehunt-ended");
            }
          }
          $rootScope.safeApply();
        });
        $scope.$on("treasurehunt-ended", function() {
          alert("You've won");
        });
      }
    }

    return {
      restrict: 'A',
      link: link
    };
  });
})();
