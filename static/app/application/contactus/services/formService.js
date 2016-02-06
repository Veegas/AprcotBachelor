(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.services');
    applicationModule.service('FormService', function FormService($http) {
        var requestedForm = {};
        return {
            fields: [{
                name: 'textfield',
                value: 'Text Field'
            }, {
                name: 'email',
                value: 'E-mail'
            }, {
                name: 'textarea',
                value: 'Text Area'
            }],
            //loads the sefault settings from the api
            getDemoForm: function() {
                // path should be dynamic not hardcoded (change later)
                var path = '/api/application/4/settings/';
                return $http.get(path).then(function(response) {
                    requestedForm = response.data;
                    return requestedForm;
                });
            },
            // should get a specific form when needed
            getForm: function(campaign_id) {
                var path;
                if (campaign_id === null) {
                    path = '/api/application/4/settings/';
                    return $http.get(path).then(function(response) {
                        requestedForm = response.data;
                        return requestedForm;
                    });
                } else {
                    path = '/api/campaign/' + campaign_id + "/settings/";
                    return $http.get(path).then(function(response) {
                        requestedForm = response.data;
                        return requestedForm;
                    });
                }
            }
        };
    });
})();
