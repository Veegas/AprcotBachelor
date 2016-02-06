(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.directives.formDirective', []);
    applicationModule.directive('formDirective', function(
        CampaignUtils) {
        return {
            controller: function($scope) {
                $scope.submit = function() {
                    if ($scope.form.campaign_id) {
                        var results_content = {};
                        var all_fields = $scope.form.form_fields;
                        angular.forEach(all_fields, function(field) {

                            results_content[field.field_title] = field.field_value;
                        });
                        var results = {
                            content: results_content,
                            fb_user: {
                                name: 'dummy',
                                age: 'dummy',
                                dob: 'dummy'
                            }
                        };
                        CampaignUtils.submitCampaignResults($scope.form.campaign_id,
                            results).then(function(response) {
                            console.log(response);
                        });
                    }
                    $scope.form.submitted = true;
                };
            },
            templateUrl: '/static/app/application/contactus/views/templates/form/form.html',
            restrict: 'E',
            scope: {
                form: '='
            }
        };
    });
})();
