'use strict';
angular.module('mod.idn')
    .controller('RegisterCtrl', ['$scope','$state', 'RegisterService', 'AlertService', 'AppService', 'RolesService', 'APP_CONFIG' , function($scope, $state, RegisterService, AlertService, AppService, RolesService, APP_CONFIG){


        $scope.showCompany = true;
        $scope.showVendor = true;
        $scope.tab={};
        $scope.tab.selectedUserTab = 0;
        $scope.tab.selectedOrgTab = 0;
        $scope.tab.selectedVendorTab = 0;
        $scope.disabledRegister = false;
        $scope.subdomainError = false;
        // $scope.onRegister = false;

        $scope.banner = '';

        $scope.user = {
            clientId:'',
            username:'',
            firstName: '',
            lastName: '',
            email:'',
            password:''
        };


//FOR USER

        $scope.registerUser = function(form){


            $scope.disabledRegister = true;

            $scope.user.username = $scope.user.email;
            $scope.user.clientId = AppService.token.config.client_id;

            console.log($scope.user);

            RegisterService.signUp($scope.user).then(function(data){

                //User registered successfully
                $scope.disabledRegister = false;

                $scope.user = {
                    clientId:'',
                    username:'',
                    firstName: '',
                    lastName: '',
                    email:'',
                    password:''
                };
                
                
                $state.go('app.dashboard');

            }, function(error){
                $scope.disabledRegister = false;
                var message = error.statusText +": ";
                for(var i=0; i<error.data.errors.length; i++){
                    message += error.data.errors[i].message + ". ";
                }
                AlertService.alert(message, 'md-warn');

            });
        };

        /*
            Getting All Roles
         */

        $scope.roles = [];

        $scope.socialLogin = function(socialType) {
            switch (socialType) {
                case 'fb':
                    FBService.fbLogin().then(function(authResponse) {
                        if (authResponse) {
                            setUserData(authResponse);
                        }
                    }, function(error) {
                        var message = error.statusText + ": ";
                        for (var i = 0; i < error.data.errors.length; i++) {
                            message += error.data.errors[i].message + ". ";
                        }
                        AlertService.alert(message, 'md-warn');
                    });
                    break;
                case 'google':
                    GoogleService.googleLogin().then(function(authResponse) {
                        if (authResponse) {
                            setUserData(authResponse);
                        }
                    }, function(error) {
                        var message = error.statusText + ": ";
                        for (var i = 0; i < error.data.errors.length; i++) {
                            message += error.data.errors[i].message + ". ";
                        }
                        AlertService.alert(message, 'md-warn');
                    });
                    break;
            }
        };

        var init = function(){
            if(APP_CONFIG && APP_CONFIG.APP && APP_CONFIG.APP.appOwner && APP_CONFIG.APP.appOwner.banner){
                $scope.banner = APP_CONFIG.APP.appOwner.banner;
            }
        };
        init();

    }]);
