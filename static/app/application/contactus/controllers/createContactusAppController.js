(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('createContactusAppController', function($scope, $modalInstance,
        FormService) {
        // preview form mode
        $scope.previewMode = false;

        // new form
        $scope.form = {};

        FormService.getDemoForm().then(function(form) {
            $scope.form = form;
        });

        $scope.campaign_name = 'My Campaign';
        // previewForm - for preview purposes, form will be copied into this
        // otherwise, actual form might get manipulated in preview mode
        $scope.previewForm = {};

        // add new field drop-down:
        $scope.addField = {};
        $scope.addField.types = FormService.fields;
        $scope.addField.new = $scope.addField.types[0].name;
        $scope.addField.lastAddedID = 4;

        // accordion settings
        $scope.accordion = {};
        $scope.accordion.oneAtATime = true;

        // create new field button click
        $scope.addNewField = function() {
            // incr field_id counter
            $scope.addField.lastAddedID++;

            var newField = {
                "field_id": $scope.addField.lastAddedID,
                "field_title": "New field - " + ($scope.addField.lastAddedID),
                "field_type": $scope.addField.new,
                "field_value": "",
                "field_required": true,
            };

            // put newField into fields array
            $scope.form.form_fields.push(newField);
        };

        // deletes particular field on button click
        $scope.deleteField = function(field_id) {
            for (var i = 0; i < $scope.form.form_fields.length; i++) {
                if ($scope.form.form_fields[i].field_id === field_id) {
                    $scope.form.form_fields.splice(i, 1);
                    break;
                }
            }
        };

        // preview form
        $scope.previewOn = function() {
            if ($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {
                alert('No fields added yet, please add fields first.');
            } else {
                $scope.previewMode = !$scope.previewMode;
                $scope.form.submitted = false;
                angular.copy($scope.form, $scope.previewForm);
                console.log($scope.form);
            }
        };

        // hide preview form, go back to create mode
        $scope.previewOff = function() {
            $scope.previewMode = !$scope.previewMode;
            $scope.form.submitted = false;
        };

        // deletes all the fields
        $scope.reset = function() {
            $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
            $scope.addField.lastAddedID = 0;
        };
        // populate campaign settings json then pass it
        $scope.saveCampaign = function() {
            var settings = {
                heading: $scope.campaign_name,
                form_id: 'ASD2341234',
                form_name: $scope.form.form_name,
                form_fields: $scope.form.form_fields
            };
            console.log(settings);
            $modalInstance.close(settings);
        };
    });
})();
