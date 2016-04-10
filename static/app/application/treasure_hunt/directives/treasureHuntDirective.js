/*globals fabric */

(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.directives');

  applicationModule.directive('treasureHuntDirective', function($timeout) {



    function link($scope, element, attrs) {

      function canvasInit() {
        var editor;
        if (attrs.editor === "false") {
          editor = false;
        } else {
          editor = true;
        }
        console.log("attrs: ", attrs);
        console.log("element[0].parentNode: ", element.parent().css('height'));
        var canvas = new fabric.Canvas(attrs.id, {
          width: element.parent().width(),
          height: element.parent().height()
        });

        if (editor) {
          $scope.$watch('components', function(oldComponents, newComponents) {
            drawComponents(newComponents);
          });
        } else {
          drawComponents($scope.components);
        }

        function drawComponents(components) {
          components.forEach(function(component) {
            var img = new Image(); // Create new img element
            img.src = component.img;
            img.onload = function() {
              console.log("WLWLADWLAWDLAW: ", canvas);
              var imgInstance = new fabric.Image(img, {
                left: component.position.x,
                top: component.position.y,
                width: component.size.width,
                height: component.size.height,
                angle: component.angle,
                selectable: editor
              });
              canvas.add(imgInstance);
            };
          });
        }



      }


      // $timeout(function(){
      //   canvasInit();
      // });

      $(document).ready(function(){
          canvasInit();
      });




    }

    return {
      restrict: 'A',
      link: link
    };
  });
})();
