(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.directives');

  applicationModule.directive('treasureHuntDirective', function() {



    function link($scope, element, attrs) {
      var canvas = element[0];


      canvas.width = canvas.parentNode.clientWidth;
      canvas.height = canvas.parentNode.clientHeight;
      var ctx = canvas.getContext('2d');
      var tile = {
        width: canvas.width / 4,
        height: canvas.height / 4
      };


      $scope.drawComponents = function drawComponents(components) {
        components.forEach(function(component) {
          console.log("component: ", component);
          var img = new Image(); // Create new img element
          img.src = component.img;
          img.onload = function() {
            var aspect = img.width / img.height;
            var imgHeight = 50;
            var imgWidth = imgHeight * aspect;
            ctx.drawImage(img, component.position.x * tile.width, component.position.y * tile.height, imgWidth, imgHeight);
          };
        });
      }



      $scope.$watch('components', function(oldComponents, newComponents) {
        $scope.drawComponents(newComponents);
      });



      ctx.rect(0, 0, tile.width, tile.height);
      ctx.stroke();



    }

    return {
      restrict: 'A',
      link: link
    };
  });
})();
