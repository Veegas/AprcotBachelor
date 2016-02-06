(function() {
    'use strict';
    // coffeescript's for in loop
    var __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; i < l; i++) {
            console.log('inside item loop');
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    };

    var applicationModule = angular.module('aprcotApp.directives.fieldDirective', []);
    applicationModule.directive('fieldDirective', function($http, $compile) {

        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '/static/app/application/contactus/views/templates/field/';
            var supported_fields = [
                'textfield',
                'email',
                'textarea',
            ];
            if (__indexOf.call(supported_fields, type) >= 0) {
                console.log('found supportted field');
                return templateUrl += type + '.html';
            }
        };

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        };

        return {
            template: '<div ng-bind="field"></div>',
            restrict: 'E',
            scope: {
                field: '='
            },
            link: linker
        };
    });
})();
