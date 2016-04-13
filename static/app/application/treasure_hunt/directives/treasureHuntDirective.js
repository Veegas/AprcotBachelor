/*globals fabric */

(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.directives');

  applicationModule.directive('treasureHuntDirective', function($timeout, $rootScope, treasureHuntAppService) {



    function link($scope, element, attrs) {
      var editor;
      if (attrs.editor === "false") {
        editor = false;
      } else {
        editor = true;
      }

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

      function setCanvasBackground(canvas, backgroundImage) {
        console.log("backgroundImage: ", backgroundImage);
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
        components.forEach(function(component) {
          addComponentToCanvas(canvas, component);
        });
      }


      function treasureHuntEditorHandlers(canvas) {
        $rootScope.$on("component-added", function (event, args) {
          drawComponents(canvas, args.diffComponents);
        });

        $scope.$watch('settings.background', function(newImage) {
          setCanvasBackground(canvas, newImage);
        });
      }

      function treasureHuntPlayableHandlers(canvas) {
        $rootScope.$on("component-added", function (event, args) {
          console.log("DIRECTIVE GET COMPONETS SERVICE: ");
          drawComponents(canvas, args.diffComponents);
        });


        canvas.on('mouse:down', function(options) {
          if (!_.isUndefined(options.target)) {
            console.log("OPTIONS TARGET: ", options.target);
            $scope.components = _.without($scope.components,
              _.findWhere($scope.components, {
                position: options.target.component.position
              }));
            options.target.remove();
            if (_.isEmpty($scope.components)) {
              $scope.$broadcast("treasurehunt-ended");
            }
          }
        });

        $scope.$on("treasurehunt-ended", function () {
          alert("You've won");
        });
      }


      // $timeout(function(){
      //   canvasInit();
      // });

      $(document).ready(function() {
        canvasInit();
      });



    }

    return {
      restrict: 'A',
      link: link
    };
  });
})();
