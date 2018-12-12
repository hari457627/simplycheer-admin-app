'use strict';

angular.module('mod.app')
    .controller('TemplatesListCtrl',  ['$scope', '$state', '$stateParams', 'ManageService', 'UserService', 'AlertService', '$mdDialog', function($scope, $state, $stateParams, ManageService, UserService, AlertService, $mdDialog) {


        $scope.scratch = function(){
            $state.go('app.Scratch',{

            });
        };



        $scope.createTemplate = function(){
            $state.go('app.createTemplate',{

            });
        };



        var init = function(){

            UserService.getTemplates($scope.finaldata).then(function(data) {



                $scope.allTemplates = data;



            });


        };
        init();










































    }]);
