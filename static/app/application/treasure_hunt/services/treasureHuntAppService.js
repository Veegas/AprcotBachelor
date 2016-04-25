(function() {
  'use strict';
  var applicationModule = angular.module('aprcotApp.application.services');
  applicationModule.factory('treasureHuntAppService', function() {
      var components = [];
      var activeComponent = null;
      return {
        pushComponents: function pushComponents(toBePushed) {
          var diffComponents = _.difference(toBePushed, components);
          console.log("SERVICE COMPONENTS: ", {
            toBePushed: toBePushed,
            components: components,
            diffComponents: diffComponents
          });
          components = toBePushed;
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
