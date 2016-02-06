(function() {
    'use strict';
    var applicationModule = angular.module('aprcotApp.application.controllers');
    var questionsList = [];
    applicationModule.controller('createQuizAppController', function($scope, $modalInstance) {
        $scope.quiz = {
            addedQuestions: [],
            questions: [],
        };
        $scope.questionId = 0;
        $scope.answers = [{
            title: '',
            score: ''
        }];

        $scope.submitAddValid = false;
        $scope.submitValid = false;

        $scope.addQuestion = function() {
            if ($scope.questionTitle === '') {
                $scope.submitAddValid = true;
                $scope.submitValid = true;

            } else if ($scope.answers.length < 2) {
                $scope.errorAnswers = "You should add at least two answers";
                $scope.submitAddValid = true;
                $scope.submitValid = true;

            } else {
                ++$scope.questionId;
                $scope.quiz.addedQuestions = {
                    'field_title': 'Question' + $scope.questionId,
                    'field_required': 'true',
                    'question': $scope.questionTitle,
                    'answers': $scope.answers
                };

                var item = {};
                angular.copy($scope.quiz.addedQuestions, item);
                $scope.quiz.questions.push(item);
                $scope.quiz.addedQuestions = undefined;
                $scope.questionTitle = "";
                $scope.answers = [];

                $scope.submitAddValid = true;
                $scope.submitValid = true;
            }
        };

        $scope.deleteQuestion = function(id) {
            var itemIndex = _.findIndex($scope.quiz.questions, {
                'id': id
            });
            $scope.quiz.questions.splice(itemIndex, 1);
            --$scope.questionId;
        };

        $scope.save = function() {
            $scope.addQuestion();
            angular.forEach($scope.quiz.questions, function(question) {
                questionsList.push(question);
            });
            var settings = {
                'title': $scope.campaignName,
                'stylesheet': $scope.quizStylesheet,
                'form_fields': questionsList
            };
            $modalInstance.close(settings);
        };

        $scope.checkTrueFalse = function(choice) {
            if (choice === "True") {
                $scope.answers = [{
                    title: 'True',
                    score: 1
                }, {
                    title: 'False',
                    score: 0
                }];
            }

            if (choice === "False") {
                $scope.answers = [{
                    title: 'True',
                    score: 0
                }, {
                    title: 'False',
                    score: 1
                }];
            }
            $scope.flagRequiredFalse = false;
        };

        $scope.addAnswer = function() {
            $scope.answers.push({
                title: '',
                score: ''
            });
        };

        $scope.removeAnswer = function() {
            var lastItem = $scope.answers.length - 1;
            $scope.answers.splice(lastItem);
        };


        $scope.closeModal = function() {
            $modalInstance.dismiss();
        };
    });

})();
