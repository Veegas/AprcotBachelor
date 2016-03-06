(function() {
    'use strict';
    var commonServices = angular.module('aprcotApp.common.services');
    commonServices.service('UserService', function($rootScope, $window, FbUser, User) {
        var self = this;
        var loginUrl = FbUser.getLoginUrl();
        this.isLoggedIn = function() {
            if (undefined !== $window.sessionStorage.token) {
                if (undefined === self.me) {
                    self.retrieveUserInfo();
                    return false;
                }
                return true;
            }
            return false;
        };
        this.login = function(code) {
            FbUser.authenticate({
                code: code
            }).$promise.then(function(response) {
                $window.sessionStorage.token = response.token;
                self.retrieveUserInfo();
            }, function(error){
                console.log(error);
            });
        };
        this.logout = function() {
            $window.sessionStorage.clear();
            $window.location.reload();
        };
        this.retrieveUserInfo = function() {
            User.getMe().$promise.then(function(response) {
                self.me = response;
                $rootScope.$emit('user:loggedIn');
            });
        };
        this.loginWindow = function() {
            $window.handler = this;
            $window.open(loginUrl.url, 'fb-login', 'toolbar=0,status=0,width=580,height=325');
        };
        this.getCurrentUser = function() {
            return self.me;
        };
        window.addEventListener('message', function(event){
            console.log(event.origin);
            if (~event.origin.indexOf('https://guc.aprcot.com')){
                self.login(event.data);
            }
        });
    });
})();
