/*globals fabric */

(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.directives');

  applicationModule.directive('treasureHuntDirective', function() {



    function link($scope, element, attrs) {

      var canvas = new fabric.Canvas(attrs.id, {
        width: element[0].parentNode.clientWidth,
        height: element[0].parentNode.clientHeight
      });
      var ctx = canvas.getContext('2d');

      $scope.drawComponents = function drawComponents(components) {
        components.forEach(function(component) {
          console.log("component: ", component);
          var img = new Image(); // Create new img element
          img.src = component.img;
          img.onload = function() {
            var imgInstance = new fabric.Image(img, {
              left: component.position.x,
              top: component.position.y,
              width: component.size.width,
              height: component.size.height,
              angle: component.angle
            });
            canvas.add(imgInstance);


          };
        });
      };



      $scope.$watch('components', function(oldComponents, newComponents) {
        $scope.drawComponents(newComponents);
      });



    }

    return {
      restrict: 'A',
      link: link
    };
  });
})();
