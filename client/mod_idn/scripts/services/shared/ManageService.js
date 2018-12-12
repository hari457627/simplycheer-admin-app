'use strict';

angular.module('mod.idn')

.factory('ManageService', ['ManageFactory', '$q', function(ManageFactory, $q) {
    var service = {};

    service.project;

    service.projectAbout;

    service.projectConfig;

    service.projectClients;

    service.subscribedModules;

    service.tenantModules;

    service.module;

    service.projectLayout;

    service.tenantTokens;

    service.theme;

    service.roles;

    service.role_edit;

    service.getProject = function(tenantId) {

        var deferred = $q.defer();
        ManageFactory.project().get({ tenantId: tenantId }, function(success) {
            service.project = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.getAbout = function(tenantId) {

        var deferred = $q.defer();
        ManageFactory.projectAbout().get({ tenantId: tenantId }, function(success) {
            console.log(success);
            service.projectAbout = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.saveAbout = function(about) {
        var deferred = $q.defer();
        ManageFactory.projectAbout().save(about, function(success) {
            service.projectAbout = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.saveAboutImage = function(tenantId, imageFor, file) {
        var deferred = $q.defer();

        ManageFactory.saveImage(tenantId, imageFor, file).then(function(success) {

            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    //All About Config
    service.getAllConfig = function(tenantId) {
        var deferred = $q.defer();

        ManageFactory.allConfig().get({ tenantId: tenantId }, function(success) {
            service.projectConfig = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.getConfByModule = function(tenantId, moduleId) {
        var deferred = $q.defer();

        ManageFactory.confByModule().get({ tenantId: tenantId, moduleId: moduleId }, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.saveConfig = function(module) {
        var deferred = $q.defer();

        ManageFactory.confByModule().save(module, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    //All About Config **** ENDS HERE ****

    //ALL ABOUT TENANT MODULES AND SUBSCRIBED MODULES

    service.getModule = function(tenantId, moduleId) {
        var deferred = $q.defer();
        ManageFactory.getModule().get({ tenantId: tenantId, moduleId: moduleId }, function(success) {
            service.module = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.createModule = function(moduleObj) {
        var deferred = $q.defer();

        ManageFactory.tenantModules().save(moduleObj, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.getTenantModules = function(tenantId) {
        var deferred = $q.defer();

        ManageFactory.tenantModules().get({ tenantId: tenantId }, function(success) {
            service.tenantModules = success;
            deferred.resolve(success);

        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.createAuthorityForModule = function(authority) {
        var deferred = $q.defer();

        ManageFactory.moduleAuthority().save(authority, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.updateAuthorityForModule = function(authority) {
        var deferred = $q.defer();

        ManageFactory.moduleAuthority().update(authority, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.updateTenantModule = function() {

    };

    service.updateModuleSecret = function(secret) {
        var deferred = $q.defer();

        ManageFactory.tenantModuleSecret().update(secret, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.activateTenantModule = function() {

    };

    service.getSubscribedModules = function(tenantId) {
        var deferred = $q.defer();
        ManageFactory.subscribedModules().get({ tenantId: tenantId }, function(success) {
            service.subscribedModules = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    //ALL ABOUT TENANT MODULES AND SUBSCRIBED MODULES    *****ENDS HERE******


    service.getClients = function(tenantId) {
        var deferred = $q.defer();
        ManageFactory.projectClients().get({ tenantId: tenantId }, function(success) {
            service.projectClients = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };


    service.getLayout = function(tenantId) {
        var deferred = $q.defer();
        ManageFactory.projectLayout().get({ tenantId: tenantId }, function(success) {
            service.projectLayout = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.setLayout = function(tenantId, layoutId) {
        var deferred = $q.defer();

        ManageFactory.projectLayout().save({ tenantId: tenantId, id: layoutId }, function(success) {
            service.projectLayout = success;
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    service.nullProject = function() {
        service.project = null;
        service.projectAbout = null;
        service.tenantTokens = null;
        service.theme = null;
    };

    service.saveClient = function(tenantId, client) {
        var deferred = $q.defer();
        ManageFactory.projectClients().save({ tenantId: tenantId }, client, function(success) {
            if (!service.projectClients) {
                service.projectClients.push(success);
            }
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.deleteClient = function(tenantId, clientId) {
        var deferred = $q.defer();
        ManageFactory.projectClients().delete({ tenantId: tenantId, clientId: clientId }, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getClientTokens = function(tenantId, clientId) {
        var deferred = $q.defer();
        ManageFactory.clientTokes().get({ tenantId: tenantId, clientId: clientId }, function(success) {
            deferred.resolve(success);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.getAllTokens = function(tenantId) {
        var deferred = $q.defer();
        ManageFactory.tenantTokens().get({ tenantId: tenantId }, function(success) {
            //service.projectClients = success;
            deferred.resolve(success);
            service.tenantTokens = success;
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    service.createTheme = function(tenantId, theme) {
        var deferred = $q.defer();
        ManageFactory.tenantTheme().save({ tenantId: tenantId }, theme, function(success) {
            //service.projectClients = success;
            deferred.resolve(success);
            service.theme = success;
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    service.getTheme = function(tenantId) {
        var deferred = $q.defer();
        ManageFactory.tenantTheme().get({ tenantId: tenantId }, function(success) {
            //service.projectClients = success;
            deferred.resolve(success);
            service.theme = success;
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    service.getApp = function(tenantId, lang) {
        var deferred = $q.defer();
        ManageFactory.app().getCode({ tenantId: tenantId, lang: lang }, function(success) {
            //service.projectClients = success;
            deferred.resolve(success);
            //service.theme = success;
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    //All About Roles

    service.getRoles = function(tenantId) {
        var defer = $q.defer();

        ManageFactory.tenantRoles().get({ tenantId: tenantId }, function(success) {
            service.roles = success;
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };


    // Tenant Module related ROLE AND AUTHORITY
    service.createRoleForModule = function(role) {
        var defer = $q.defer();

        ManageFactory.moduleRoles().save(role, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.addAuthorityForRoleInModule = function(authorities) {
        var defer = $q.defer();

        ManageFactory.authorityForRoleInModule().add(authorities, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.deleteAuthorityForRoleInModule = function(authorities) {
        var defer = $q.defer();

        ManageFactory.authorityForRolesDeleteInModule(authorities).then(function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    // Tenant related ROLE AND AUTHORITY
    service.createRole = function(role) {
        var defer = $q.defer();

        ManageFactory.tenantRoles().save(role, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.updateRole = function(role) {
        var defer = $q.defer();

        ManageFactory.tenantRoles().update(role, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.deleteRole = function(role) {
        var defer = $q.defer();

        ManageFactory.tenantRoles().delete(role, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.addAuthorityForRole = function(authorities) {
        var defer = $q.defer();

        ManageFactory.authorityForRole().add(authorities, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.deleteAuthorityForRole = function(authorities) {
        var defer = $q.defer();

        ManageFactory.tenantRolesDelete(authorities).then(function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    //Tenant Member Roles
    service.getMemberRole = function(tenantId, memberId) {
        var defer = $q.defer();

        ManageFactory.memberRoles().get({ tenantId: tenantId, memberId: memberId }, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.assignRole = function(tenantId, memberId, obj) {
        var defer = $q.defer();

        ManageFactory.memberRoles().save({ tenantId: tenantId, memberId: memberId }, obj, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };

    service.notifyModule = function(url, obj) {
        var defer = $q.defer();
        ManageFactory.notifyModule(url).save(obj, function(success) {
            defer.resolve(success);
        }, function(error) {
            defer.reject(error);
        });

        return defer.promise;
    };



    return service;

}])

.factory('ManageFactory', ['MOD_IDN', 'SessionService', '$resource',   '$q', '$http', function(MOD_IDN, SessionService, $resource,  $q, $http) {
    var factory = {};

    factory.project = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'tenant/v0/tenants/:tenantId/show', {}, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.getModule = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/tenants/:tenantId/modules/:moduleId/show', {}, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };


    factory.tenantModules = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/tenants/:tenantId/modules', { tenantId: '@tenantId' }, {
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            },
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                },
                isArray: true
            }
        })
    };

    factory.moduleAuthority = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/modules/:moduleId/authorities', { moduleId: '@moduleUuid' }, {
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
                isArray: true
            }
        })
    };

    // CONFIGURATION RELATED
    factory.allConfig = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/config/tenant/:tenantId', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                },
                isArray: true
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.confByModule = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/config/tenant/:tenantId/:moduleId', {
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


    factory.projectAbout = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'about/v0/tenants/:tenantId/about', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };



    factory.subscribedModules = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/tenants/:tenantId/modules/subscribed', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                },
                isArray: true
            }
        })
    };

    factory.projectClients = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'oauth/v0/tenants/:tenantId/clients/:clientId', {
            tenantId: '@tenantId',
            clientId: '@clientId'
        }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                },
                isArray: true
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            },
            'delete': {
                method: 'DELETE',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.projectTokens = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'oauth/v0/tenants/:tenantId/tokens', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.projectTokensForClient = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'oauth/v0/tenants/:tenantId/clients/:clientId/tokens', {
            tenantId: '@tenantId',
            clientId: '@clientId'
        }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            },
            'remove': {
                method: 'DELETE',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.projectLayout = function() {

        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/tenants/:tenantId/layout', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.clientTokes = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'oauth/v0/tenants/:tenantId/clients/:clientId/tokens', {
            tenantId: '@tenantId',
            clientId: '@clientId'
        }, {
            'get': {
                method: 'GET',
                isArray: true,
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.tenantModuleSecret = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'oauth/v0/tenants/:tenantId/clients/:clientId/secret', { tenantId: '@tenantId', clientId: '@clientId' }, {
            'update': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    };

    factory.tenantTokens = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'oauth/v0/tenants/:tenantId/tokens', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                isArray: true,
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    }

    factory.tenantTheme = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + 'core/v0/tenants/:tenantId/theme', { tenantId: '@tenantId' }, {
            'get': {
                method: 'GET',
                isArray: false,
                headers: {
                    Authorization: bearer
                }
            },
            'save': {
                method: 'POST',
                headers: {
                    Authorization: bearer
                }
            }
        })
    }

    factory.app = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.BUILD_API + "console/:tenantId/build/:lang", { tenantId: '@tenantId', lang: '@lang' }, {
            'getCode': {
                method: 'GET',
                headers: {
                    'Authorization': bearer
                }
            }
        })
    }

    factory.moduleRoles = function(role) {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + "core/v0/modules/:moduleId/roles", { moduleId: '@moduleId' }, {
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

    factory.authorityForRoleInModule = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + "core/v0/modules/:moduleId/:roleId/authorities", { moduleId: '@moduleId', roleId: '@roleId' }, {
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

    factory.authorityForRolesDeleteInModule = function(role) {
        var bearer = "Bearer " + SessionService.getStoredUserToken();
        var deleteUrl = MOD_IDN.API_URL + "identity/v0/modules/" + role.moduleId + "/" + role.roleId + "/authorities";
        //NOTE: this has to be a $http request since 'DELETE' in $resource does not accept a payload

        return $http({
            method: 'DELETE',
            url: deleteUrl,
            headers: {
                Authorization: bearer
            },
            data: role
        });
    };


    factory.tenantRoles = function(role) {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + "tenants/:tenantId/roles", { tenantId: '@tenantId' }, {
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

    factory.authorityForRole = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + "identity/v0/tenants/:tenantId/:roleId/authorities", { tenantId: '@tenantId', roleId: '@roleId' }, {
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

    factory.tenantRolesDelete = function(role) {
        var bearer = "Bearer " + SessionService.getStoredUserToken();
        var deleteUrl = MOD_IDN.API_URL + "identity/v0/tenants/" + role.tenantId + "/" + role.roleId + "/authorities";
        //NOTE: this has to be a $http request since 'DELETE' in $resource does not accept a payload

        return $http({
            method: 'DELETE',
            url: deleteUrl,
            headers: {
                Authorization: bearer
            },
            data: role
        });
    };

    factory.memberRoles = function() {
        var bearer = "Bearer " + SessionService.getStoredUserToken();

        return $resource(MOD_IDN.API_URL + "tenants/:tenantId/members/:memberId/roles", {
            tenantId: '@tenantId',
            memberId: '@memberId'
        }, {
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
            }
        })
    };

    factory.notifyModule = function(url) {
        var bearer = "Bearer " + SessionService.getStoredUserToken();
        return $resource(url, {}, {
            'save': {
                method: 'POST',
                headers: {
                    'Authorization': bearer
                }
            }
        })
    };









    return factory;
}])
