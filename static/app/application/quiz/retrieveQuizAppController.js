(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    applicationModule.controller('retrieveQuizAppController', function($scope, settings) {
        $scope.showScore = false;

        $scope.campaignName = settings.title;
        $scope.formFields = settings['form_fields'];

        $scope.results = {
            'field_title': '',
            'correctAnswer': '',
        };
        $scope.totalQuizScore = 0;
        $scope.userScore = 0;
        $scope.percentageScore = 0;

        $scope.userChoice = [];
        $scope.resultsList = [];

        $scope.calculateScore = function() {
            $scope.showScore = true;
            angular.forEach($scope.formFields, function(field) {
                $scope.results['field_title'] = field['field_title'];

                angular.forEach(field['answers'], function(answer, index) {
                    $scope.totalQuizScore += answer['score'];
                    if (answer['score'] > 0) {
                        $scope.results.correctAnswer = answer['title'];
                    }

                    if ($scope.userChoice[index] === $scope.results.correctAnswer) {
                        $scope.userScore += answer['score'];
                    }
                });

                var item = {};
                angular.copy($scope.results, item);
                $scope.resultsList.push(item);
            });

            $scope.percentageScore = (($scope.userScore) / ($scope.totalQuizScore)) * 100;
        };
    });

})();
