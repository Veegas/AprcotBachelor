(function() {
  'use strict';
  var app = angular.module('aprcotApp.common.directives');
  app.directive('accordionMenu', function() {
    return {
      restrict: 'A',
      replace: true,
      link: function($scope, element, attrs) {
        var collapse = element.find('.accordion-body');
        element.bind('click', function(e) {
          collapse.toggleClass("active");
        });

        collapse.bind('click', function (e) {
          e.stopPropagation();
        });
      }
    };
  });
})();
