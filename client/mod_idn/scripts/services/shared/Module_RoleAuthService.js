'use strict';

angular.module('mod.nbos')

    .factory('Module_RoleAuthService', ['Module_RoleAuthFactory', '$q', function (Module_RoleAuthFactory, $q) {
        var service = {};

        service.module;

        service.moduleActive;

        service.authorities;

        service.authority_edit;

        service.roles;

        service.role_edit;

        //ALL ABOUT TENANT MODULES AND SUBSCRIBED MODULES

        service.getModule = function(tenantId, moduleId){
            var deferred = $q.defer();
            Module_RoleAuthFactory.getModule().get({tenantId: tenantId, moduleId: moduleId}, function(success){
                service.module = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        service.createAuthorityForModule = function(authority){
            var deferred = $q.defer();

            Module_RoleAuthFactory.moduleAuthority().save(authority, function(success){
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        service.updateAuthorityForModule = function(authority){
            var deferred = $q.defer();

            Module_RoleAuthFactory.moduleAuthority().update(authority, function(success){
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        service.updateTenantModule = function(){

        };

        service.updateModuleSecret = function(secret){
            var deferred = $q.defer();

            Module_RoleAuthFactory.tenantModuleSecret().update(secret, function(success){
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        service.activateTenantModule = function(obj){
            var deferred = $q.defer();
            Module_RoleAuthFactory.activateModule().save(obj, function (success) {
                service.moduleActive = true;
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.deactivateTenantModule = function(obj){
            var deferred = $q.defer();
            Module_RoleAuthFactory.deactivateModule(obj).then(function (success) {
                service.moduleActive = false;
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        service.getSubscribedModules = function (tenantId) {
            var deferred = $q.defer();
            Module_RoleAuthFactory.subscribedModules().get({tenantId: tenantId}, function (success) {
                service.subscribedModules = success;
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        //ALL ABOUT TENANT MODULES AND SUBSCRIBED MODULES    *****ENDS HERE******



        //All About Roles

        service.getRoles = function (tenantId) {
            var defer = $q.defer();

            Module_RoleAuthFactory.tenantRoles().get({tenantId: tenantId}, function (success) {
                service.roles = success;
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };


        // Tenant Module related ROLE AND AUTHORITY
        service.createRoleForModule = function (role) {
            var defer = $q.defer();

            Module_RoleAuthFactory.moduleRoles().save(role, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.updateRoleForModule = function (role) {
            var defer = $q.defer();

            Module_RoleAuthFactory.moduleRoles().update(role, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.deleteRoleForModule = function (role) {
            var defer = $q.defer();

            Module_RoleAuthFactory.deleteRole(role).then(function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.addAuthorityForRoleInModule = function (authorities) {
            var defer = $q.defer();

            Module_RoleAuthFactory.authorityForRoleInModule().add(authorities, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.deleteAuthorityForRoleInModule = function (authorities) {
            var defer = $q.defer();

            Module_RoleAuthFactory.authorityForRolesDeleteInModule(authorities).then(function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        // Tenant related ROLE AND AUTHORITY
        service.createRole = function (role) {
            var defer = $q.defer();

            Module_RoleAuthFactory.tenantRoles().save(role, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.updateRole = function (role) {
            var defer = $q.defer();

            Module_RoleAuthFactory.tenantRoles().update(role, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.deleteRole = function (role) {
            var defer = $q.defer();

            Module_RoleAuthFactory.tenantRoles().delete(role, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.addAuthorityForRole = function (authorities) {
            var defer = $q.defer();

            Module_RoleAuthFactory.authorityForRole().add(authorities, function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };

        service.deleteAuthorityForRole = function (authorities) {
            var defer = $q.defer();

            Module_RoleAuthFactory.tenantRolesDelete(authorities).then(function (success) {
                defer.resolve(success);
            }, function (error) {
                defer.reject(error);
            });

            return defer.promise;
        };


        return service;

    }])

    .factory('Module_RoleAuthFactory', ['MOD_NBOS', 'SessionService', '$resource', 'Upload', '$q', '$http', function (MOD_NBOS, SessionService, $resource, Upload, $q, $http) {
        var factory = {};

        factory.getModule = function(){

            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + 'core/v0/tenants/:tenantId/modules/:moduleId/show', {}, {
                'get' : {
                    method : 'GET',
                    headers : {
                        Authorization : bearer
                    }
                }
            })
        };

        factory.moduleAuthority = function () {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + 'core/v0/modules/:moduleId/authorities', {moduleId : '@moduleUuid'}, {
                'save': {
                    method: 'POST',
                    headers: {
                        Authorization: bearer
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        Authorization: bearer
                    }
                },
                'remove': {
                    method: 'DELETE',
                    headers: {
                        Authorization: bearer
                    },
                    isArray : true
                }
            })
        };

        factory.confByModule = function () {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + 'core/v0/config/tenant/:tenantId/:moduleId', {
                tenantId: '@tenantId',
                moduleId: '@uuid'
            }, {
                'get': {
                    method: 'GET',
                    headers: {
                        Authorization: bearer
                    },
                    isArray: true
                },
                'save': {
                    method: 'PUT',
                    headers: {
                        Authorization: bearer
                    }
                }
            });
        };

        // CONFIGURATION RELATED - ***ENDS HERE***

        factory.subscribedModules = function () {

            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + 'core/v0/tenants/:tenantId/modules/subscribed', {tenantId: '@tenantId'}, {
                'get': {
                    method: 'GET',
                    headers: {
                        Authorization: bearer
                    },
                    isArray: true
                }
            })
        };

        factory.activateModule = function () {

            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + 'core/v0/tenants/:tenantId/modules/subscribe', {tenantId: '@tenantId'}, {
                'save': {
                    method: 'POST',
                    headers: {
                        Authorization: bearer
                    }
                }
            })
        };

        factory.deactivateModule = function (role) {

            var bearer = "Bearer " + SessionService.getStoredUserToken();

            var deleteUrl = MOD_NBOS.API_URL + "core/v0/tenants/" +role.tenantId +"/modules/subscribe";
            //NOTE: this has to be a $http request since 'DELETE' in $resource does not accept a payload

            return $http({
                method : 'DELETE',
                url : deleteUrl,
                headers :{
                    Authorization: bearer
                },
                data : role
            });
        };

        factory.tenantModuleSecret = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + 'oauth/v0/tenants/:tenantId/clients/:clientId/secret', {tenantId: '@tenantId', clientId : '@clientId'}, {
                'update': {
                    method: 'POST',
                    headers: {
                        Authorization: bearer
                    }
                }
            })
        };

        factory.moduleRoles = function (role) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + "core/v0/modules/:moduleId/roles", {moduleId : '@moduleId'}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'Authorization': bearer
                    }
                },
                'save': {
                    method: 'POST',
                    headers: {
                        'Authorization': bearer
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Authorization': bearer
                    }
                },
                'remove': {
                    method: 'DELETE',
                    headers: {
                        'Authorization': bearer
                    }
                }
            })
        };

        factory.deleteRole = function(role){
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            var deleteUrl = MOD_NBOS.API_URL + "core/v0/modules/" +role.moduleId +"/roles";
            //NOTE: this has to be a $http request since 'DELETE' in $resource does not accept a payload

            return $http({
                method : 'DELETE',
                url : deleteUrl,
                headers :{
                    Authorization: bearer
                },
                data : role
            });
        };

        factory.authorityForRoleInModule = function () {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + "core/v0/modules/:moduleId/:roleId/authorities", {moduleId : '@moduleId', roleId : '@roleId'}, {
                'add': {
                    method: 'POST',
                    headers: {
                        'Authorization': bearer
                    }
                },
                'remove': {
                    method: 'DELETE',
                    headers: {
                        'Authorization': bearer
                    }
                }
            })
        };

        factory.authorityForRolesDeleteInModule = function(role){
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            var deleteUrl = MOD_NBOS.API_URL + "core/v0/modules/" +role.moduleId +"/" +role.roleId +"/authorities";
            //NOTE: this has to be a $http request since 'DELETE' in $resource does not accept a payload

            return $http({
                method : 'DELETE',
                url : deleteUrl,
                headers :{
                    Authorization: bearer
                },
                data : role
            });
        };


        factory.tenantRoles = function (role) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + "identity/v0/tenants/:tenantId/roles", {tenantId : '@tenantId'}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'Authorization': bearer
                    }
                },
                'save': {
                    method: 'POST',
                    headers: {
                        'Authorization': bearer
                    }
                },
                'update': {
                    method: 'PUT',
                    headers: {
                        'Authorization': bearer
                    }
                },
                'remove': {
                    method: 'DELETE',
                    headers: {
                        'Authorization': bearer
                    }
                }
            })
        };

        factory.authorityForRole = function () {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_NBOS.API_URL + "identity/v0/tenants/:tenantId/:roleId/authorities", {tenantId : '@tenantId', roleId : '@roleId'}, {
                'add': {
                    method: 'POST',
                    headers: {
                        'Authorization': bearer
                    }
                },
                'remove': {
                    method: 'DELETE',
                    headers: {
                        'Authorization': bearer
                    }
                }
            })
        };

        factory.tenantRolesDelete = function(role){
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            var deleteUrl = MOD_NBOS.API_URL + "identity/v0/tenants/" +role.tenantId +"/" +role.roleId +"/authorities";
            //NOTE: this has to be a $http request since 'DELETE' in $resource does not accept a payload

            return $http({
                method : 'DELETE',
                url : deleteUrl,
                headers :{
                    Authorization: bearer
                },
                data : role
            });
        };

        return factory;
    }])
