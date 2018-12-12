'use strict';

angular.module('mod.app')
    .controller('QuestionsListCtrl',  ['$scope', '$state', '$stateParams', 'ManageService', 'UserService', 'AlertService', '$mdDialog', function($scope, $state, $stateParams, ManageService, UserService, AlertService, $mdDialog) {


        $scope.CreateQuestions = function(){
            $state.go('app.CreateQuestions',{

            });
        };


        var init = function(){

            UserService.getQuests($scope.finaldata).then(function(data) {



                $scope.allQuestions = data;
                console.log($scope.allQuestions);


            });


        }
        init();










































    }]);
