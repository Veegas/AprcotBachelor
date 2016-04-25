(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.services');
  applicationModule.factory('treasureHuntAppService', function($rootScope) {
      var components = [];
      var activeComponent = null;
      return {
        pushComponents: function pushComponents(toBePushed) {
          var oldComponents = components;
          var diffComponents = _.difference(toBePushed, components);
          components = components.concat(diffComponents);
          $rootScope.$broadcast("component-added", {
            oldComponents: oldComponents,
            diffComponents: diffComponents,
            newComponents: components
          });
        },
        getComponents: function getComponents() {
          return components;
        },
        pushActiveComponent: function pushActiveComponent(component) {
          activeComponent = component;
        },
        getActiveComponent: function getActiveComponent() {
          return activeComponent;
        }
      };
  });
})();
