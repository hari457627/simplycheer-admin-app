'use strict';

angular.module('mod.app')
.controller('AppHeaderCtrl', ['$scope', 'UserService', '$mdDialog', function($scope, UserService, $mdDialog){
    $scope.isAdmin = false;


    $scope.linkClicked = function(ev){
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is a random alert')
                .textContent('You can define functionality in app.headerCtrl.js file.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
        );
    };

    var init = function(){
        if(UserService.roles && UserService.roles.isAdmin){
            $scope.isAdmin = true;
        };
    };

    init();
}]);