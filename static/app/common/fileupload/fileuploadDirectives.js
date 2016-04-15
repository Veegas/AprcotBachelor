(function() {
  'use strict';
  var fileupload = angular.module('aprcotApp.common.fileupload.directives');
  fileupload.directive('fileChange', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        fileChange: '&'
      },
      link: function link(scope, element, attrs, ctrl) {
        function onChange() {
          console.log("FILE UPLOAD DIRECTIVE ON CHANGE");
          ctrl.$setViewValue(element[0].files[0]);
          scope.fileChange();
        }

        element.on('change', onChange);

        scope.$on('destroy', function() {
          element.off('change', onChange);
        });

      }
    };
  });
})();
