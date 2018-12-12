'use strict';

angular.module('mod.app')
.controller('AppDashboardCtrl',  ['$scope', '$state', '$stateParams', 'ManageService', 'UserService', 'AlertService', '$mdDialog', function($scope, $state, $stateParams, ManageService, UserService, AlertService, $mdDialog) {


    var tenantId = 'TNT:CWC-0ncoum9w';
    //var tenantId = 'TNT:appConsole';
    $scope.users = [];
    $scope.logo = "mod_nbos/assets/images/profile.png";
    $scope.search = {};
    $scope.tenantRoles = [];


    var getUsers = function() {
        $scope.users = [];
        UserService.getTenantUsers(tenantId).then(function(response) {
            //$scope.users = response;
            $scope.userCount = response.length;
        }, function(response) {
            console.log("error");
        })
    };

    var getTenantRoles = function() {
        ManageService.getRoles(tenantId).then(function(response) {
            $scope.tenantRoles = response;
        }, function(error) {
            console.log("error in retrieving roles");
        })
    }

    $scope.query = {
        max: 10,
        page: 1
    };


    $scope.data = [];
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.currentNavItem = "all";

    $scope.editRole = function(user, ev) {
        $mdDialog.show({
            controller: function($scope, $mdDialog, AlertService, User, tenantRoles, ManageService, $stateParams) {
                User.role = "Admin";
                var tenantId = 'TNT:CWC-0ncoum9w';
                $scope.roles = tenantRoles;
                $scope.userRole = {};
                $scope.create = function() {
                    console.log($scope.userRole);
                    var obj = {
                        "uRoleName": $scope.userRole.uRoleName
                    }
                    ManageService.assignRole(tenantId, User.id, obj).then(function(response) {
                        AlertService.alert("Role Assigned Successfully", 'md-primary');
                        $mdDialog.hide();
                    }, function(error) {
                        console.log("Error Assigning Role");
                    });

                };

                $scope.closeDialog = function() {
                    $mdDialog.cancel();
                };
                var userRole = function() {
                    ManageService.getMemberRole(tenantId, User.uuid).then(function(response) {
                        if (response && response.length) {
                            for (var i = 0, len = $scope.roles.length; i < len; i++) {
                                if ($scope.roles[i].uRoleName == response[0].uRoleName) {
                                    $scope.userRole = $scope.roles[i];
                                    break;
                                }
                            }
                        } else {

                        }
                    }, function(error) {
                        console.log("Error retrieving user role");
                    })
                };
                userRole();
            },
            templateUrl: 'mod_app/views/dashboard/manage.updateRole.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                "User": user,
                "tenantRoles": $scope.tenantRoles
            }
        })
            .then(function(module) {
                if (module) {
                    $scope.modules.push(module);
                    createDevTenant(module);
                };
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.querySearch = function() {
        $scope.users = [];
        var userObj = JSON.parse(JSON.stringify($scope.query))
        userObj.tenantId = tenantId;
        UserService.searchUser(userObj).then(function(response) {

            $scope.data = response;
            if (response) {
                $scope.users = response;
            }
            return response;
        }, function(response) {

        })
    };

    $scope.filterUsers = function(query) {

        if (!query) return;
        $scope.users = [];
        var userObj = {
            "tenantId": tenantId,
            "page": 1,
            "max": 15,
            "filter.firstName": query,
            "filter.email": query
        };

        UserService.searchUser(userObj).then(function(response) {

            $scope.data = response;
            if (response) {
                $scope.users = response;
            }
            return response;
        }, function(response) {

        })
    };

    var init = function() {


            $scope.project = ManageService.project;
            $scope.projectAbout = ManageService.projectAbout;
            $scope.querySearch();
            getUsers();
            getTenantRoles();

    };

    init();
}]);