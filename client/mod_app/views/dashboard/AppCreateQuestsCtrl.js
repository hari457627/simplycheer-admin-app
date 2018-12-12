'use strict';

angular.module('mod.app')
    .controller('AppCreateQuestsCtrl',  ['$scope', '$state', '$stateParams', 'ManageService', 'UserService', 'AlertService', '$mdDialog', function($scope, $state, $stateParams, ManageService, UserService, AlertService, $mdDialog) {


    $scope.minusdisabled = false;
        $scope.plusdisabled = false;
    if ($scope.weightage === 0){
        $scope.minusdisabled = true;
    }
        if ($scope.weightage === 4){
            $scope.plusdisabled = true;
        }


    $scope.weightage = 0;
    $scope.incrementweightage = function () {
        $scope.weightage = $scope.weightage + 1;
    }
    $scope.decrementweightage = function () {
        $scope.weightage = $scope.weightage - 1;
    }

        $scope.weightage1 = 0;
        $scope.incrementweightage1 = function () {
            $scope.weightage1 = $scope.weightage1 + 1;
        }
        $scope.decrementweightage1 = function () {
            $scope.weightage1 = $scope.weightage1 - 1;
        }

        $scope.weightage2 = 0;
        $scope.incrementweightage2 = function () {
            $scope.weightage2 = $scope.weightage2 + 1;
        }
        $scope.decrementweightage2 = function () {
            $scope.weightage2 = $scope.weightage2 - 1;
        }

        $scope.weightage3 = 0;
        $scope.incrementweightage3 = function () {
            $scope.weightage3 = $scope.weightage3 + 1;
        }
        $scope.decrementweightage3 = function () {
            $scope.weightag3 = $scope.weightage3 - 1;
        }

        $scope.optionweightage = [];


        $scope.optionweightage.push($scope.weightage,$scope.weightage1,$scope.weightage2,$scope.weightage3);
        console.log($scope.optionweightage);

        $scope.createquestionlist = function(createQuest,weightage,weightage1,weightage2,weightage3){

            $scope.finaldata = {};
            $scope.finaldata.tags = [];
            createQuest.weightage = weightage;
            createQuest.weightage1 = weightage1;
            createQuest.weightage2 = weightage2;
            createQuest.weightage3 = weightage3;



            $scope.finaldata.title = createQuest.question;
            $scope.finaldata.type =  createQuest.questiontype;

            $scope.finaldata.options = [];
            $scope.finaldata.options.push({"text":createQuest.option1,"weightage":createQuest.weightage},{"text":createQuest.option2,"weightage":createQuest.weightage1},{"text":createQuest.option3,"weightage":createQuest.weightage2},{"text":createQuest.option4,"weightage":createQuest.weightage3})


            $scope.finaldata.tags.push(createQuest.tags);
            console.log($scope.finaldata);


            UserService.createQuests($scope.finaldata).then(function(data) {


                AlertService.alert("Question Created Successfully");
                $state.go('app.questions');


            });





        }













































    }]);