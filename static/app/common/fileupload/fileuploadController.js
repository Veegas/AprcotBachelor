(function() {
    'use strict';
    var fileModule = angular.module('aprcotApp.common.fileupload.controllers');
    fileModule.controller('fileuploadController', function($scope, Upload, Files, $timeout, $modalInstance) {

        $scope.uploadFiles = function(file, errFiles) {
            console.log("UPLOAD FILES: ", file);
            $scope.file = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    'url': '/api/images/',
                    'uploaded_file': file,
                    'data': {
                        'uploaded_file': file,
                        'file_type': file.type,
                        'original_name': file.name
                    }
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        $modalInstance.close(response.data);
                    });
                }, function(response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        $scope.closeModal = function(file) {
            $modalInstance.dismiss(file);
        };

    });

})();
