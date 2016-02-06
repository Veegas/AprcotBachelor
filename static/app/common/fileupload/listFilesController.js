(function() {
    'use strict';
    var fileModule = angular.module('aprcotApp.common.fileupload.controllers');
    fileModule.controller('listFilesController', function($scope, $modal, Files, SingleFile) {
        $scope.files = [];

        $scope.addFiles = function() {
            filePromise.then(function(response) {
                var modalInstance = $modal.open({
                    controller: 'fileuploadController',
                    templateUrl: 'static/app/common/fileupload/fileuploadView.html',
                    resolve: {
                        files: function() {
                            return response;
                        }
                    }
                });
                modalInstance.result.then(function(item) {
                    console.log(item);
                    $scope.files.push(item);
                });
            });
        };

        var filePromise = Files.query().$promise;
        filePromise.then(function(files) {
            angular.forEach(files, function(item) {
                var temp = item;
                $scope.files.push(temp);
            });
        });


        $scope.deleteFile = function(id) {
            var fileIdPromise = SingleFile.remove({
                'id': id
            }).$promise;
            fileIdPromise.then(function() {
                $scope.files = _.reject($scope.files, function(file) {
                    return file.pk === id;
                });
                console.log('File Deleted');
            });

        };

    });

})();
