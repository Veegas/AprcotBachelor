(function() {
    'use strict';
    var commonServices = angular.module('aprcotApp.common.services');
    commonServices.factory('Helpers', function($state, $modal) {
        return {
            // tweet-sized js template engine
            t: function(s, d) {
                for (var p in d) {
                    if (d.hasOwnProperty(p)) {
                        s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                    }
                }
                return s;
            },

            // get key from json object using a value
            getKeyByValue: function(object, value) {
                for (var prop in object) {
                    if (object.hasOwnProperty(prop) && object[prop] === value) {
                        return prop;
                    }
                }
            },

            // get the app url state using its identifier
            getStateFromIdentifier: function(identifier) {
                var allStates = $state.get();
                var targetStateName = identifier;
                return _.findWhere(allStates, {
                    name: targetStateName
                });
            },
            getAppStateFromIdentifier: function(identifier) {
                return this.getStateFromIdentifier('app.' + identifier);
            },

            //create Modal object using state
            createModalFromState: function(state, resolve) {
                return $modal.open({
                    controller: state.views['content@'].controller,
                    templateUrl: state.views['content@'].templateUrl,
                    resolve: resolve,
                    backdrop: 'static'
                });
            },
        };
    });
})();
