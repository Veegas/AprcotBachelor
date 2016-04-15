(function() {
  'use strict';
  var campaignModule = angular.module('aprcotApp.campaign.controllers');
  campaignModule.controller('listApplicationController', function(
    $rootScope, $scope,
    UserService, CampaignUtils, $state
  ) {
    $rootScope.$on('user:loggedIn', function() {
      $scope.isLoggedIn = UserService.isLoggedIn();
    });

    $scope.isLoggedIn = UserService.isLoggedIn();
    $scope.applications = $rootScope.APPLICATION_DATA;
    // $scope.backgroundColors = ['#8acf99', '#FF5D86', '#C6F1EA', '#FDDCB1', '#5F98C3', '#EECDD6', '#C3D4E6'];
    // $scope.backgroundColors = ['#00D4C8', '#FE5373', '#d1fe52', '#FFB347', '#5F98C3', '#D8899E', '#9d5fc3'];
    // $scope.backgroundColors = ['#AEEBFD','#998BFA', '#C290FB',  '#EBAFB0',  '#F5CFA9',  '#FEF3BB',  '#DAE8B6'];
    // $scope.backgroundColors = ["#88E1FB","#84B3FC","#654FF9","#A557F9","#D270A6","#EA977E","#E38587","#F0B77A","#F4C87C","#FDED99","#F3EF94","#C6DD8F"];
    // $scope.backgroundColors = ["#88E1FB","#84B3FC","#A557F9","#EA977E","#F0B77A","#FDED99","#C6DD8F"];
    $scope.backgroundColors = ["#E35450","#EB7655","#EFA25C","#E7C468","#52D39A","#50BFD3","#4A97DD"];

    $scope.icons = ["fa-map-marker", "fa-cogs", "fa-th", " fa-shopping-cart", "fa-puzzle-piece", " fa-map", "fa-heart-o"];

    // $scope.$watch('applications', function(applications) {
    //   console.log("$scope.applications: ", applications);
    //   if (!_.isUndefined(applications)) {
    //     applications.map(function AddColors(app) {
    //       var randomColorIndex = Math.floor(Math.random * $scope.backgroundColors.length);
    //       app.backgroundColor = $scope.backgroundColors[randomColorIndex];
    //       return app;
    //     });
    //   }
    // });

      var objectIndex = 0;
    _.object(_.map($scope.applications, function(app, key) {
      // var randomColorIndex = Math.floor(Math.random() * $scope.backgroundColors.length);
      app.backgroundColor = $scope.backgroundColors[objectIndex];
      app.icon = $scope.icons[objectIndex];
      objectIndex++;
      console.log("RANDOM COLOR INDEX: ", key);
      // console.log("$scope.backgroundColors: ", $scope.backgroundColors);
      // $scope.backgroundColors.splice(randomColorIndex, 1);
      return app;
    }));

    console.log("$scope.applications: ", $scope.applications);



    $scope.showDemo = function(applicationId) {
      CampaignUtils.viewDemo(applicationId);
    };

    $scope.createCampaign = function(applicationId) {
      if (applicationId === 22) {
        $state.go('treasurehunt_create');
      } else {
        CampaignUtils.create(applicationId);
      }
    };
  });
})();
