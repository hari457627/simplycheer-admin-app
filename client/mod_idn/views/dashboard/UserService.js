'use strict';

angular.module('mod.idn')
        .factory('UserService', ['UserFactory', '$q', function(UserFactory, $q){

            var factory = {};

            factory.user_access_token;

            factory.member;

            // factory.token;

            //TODO: retrieve user_access_token for all calls for modules from UserService not SessionService

            factory.setUser = function(key, val){
                factory[key] = val;

            };

            factory.checkUserObj = function(){
                return factory.member? true:false;
            };

            factory.deleteUser = function(){
                factory.member = null;
                factory.token = null;
            };
            factory.getTenantUsers = function(tenantId) {
                var deferred = $q.defer();

                UserFactory.tenantUser().get({ tenantId: tenantId }, function(success) {
                    deferred.resolve(success);
                }, function(error) {

                    deferred.reject(error);
                });

                return deferred.promise;

            };

            factory.searchUser = function(obj) {
                var deferred = $q.defer();

                UserFactory.tenantUser().get(obj, function(success) {
                    deferred.resolve(success);
                }, function(error) {

                    deferred.reject(error);
                });

                return deferred.promise;

            }
            factory.getUserObject = function(val){
                var deferred = $q.defer();

                UserFactory.getUserObject().get({userId:val}, function(success){
                    console.log("USERSERVICE:getUserObject");
                    console.log(success);
                    factory.member = success;
                    deferred.resolve(success);
                }, function(error){
                    
                    deferred.reject(error);
                });

                return deferred.promise;

            };











            factory.getQuests = function(){
                var deferred = $q.defer();

                UserFactory.getQuests().get({}, function(success){
                    factory.fullList = success;
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                } );

                return deferred.promise;
            };











            factory.createQuests = function(paramObj){
                var deferred = $q.defer();

                UserFactory.createQuests().quests(paramObj, function(success){
                    factory.quests = success;
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            };






            factory.getTemplates = function(){
                var deferred = $q.defer();

                UserFactory.getTemplates().get({}, function(success){
                    factory.fullList = success;
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                } );

                return deferred.promise;
            };


            factory.postTemplate = function(paramObj){
                var deferred = $q.defer();

                UserFactory.postTemplate().template(paramObj, function(success){
                    factory.template = success;
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            };












            return factory;
        }])

        .factory('UserFactory', ['$resource', 'MOD_IDN', 'SessionService', function($resource, MOD_IDN, SessionService){
            var factory = {};

            factory.getUserObject = function(){
                var bearer = "Bearer " + SessionService.getStoredUserToken();

                return $resource(MOD_IDN.API_URL + 'users/:userId', {}, {
                    'get':{
                        method : 'GET',
                        headers: {
                            "Authorization" : bearer
                        }
                    }
                })
            };
            factory.tenantUser = function() {
                var bearer = "Bearer " + SessionService.getStoredUserToken();

                return $resource(MOD_IDN.API_URL + 'tenants/:tenantId/members', {
                    tenantId: '@tenantId'
                }, {
                    'get': {
                        method: 'GET',
                        isArray: true,
                        headers: {
                            "Authorization": bearer
                        }
                    }
                })
            };









            factory.getQuests = function(){
                var bearer = "Bearer " + SessionService.getStoredUserToken();

                return $resource(MOD_IDN.REVIEW_API_URL + 'questions', {}, {
                    'get':{
                        method : 'GET',
                        isArray : true,
                        headers: {
                            "Authorization" : bearer
                        }
                    }
                });
            };





            factory.createQuests = function(paramObj) {
                var bearer = "Bearer " + SessionService.getStoredUserToken();
                return $resource(MOD_IDN.REVIEW_API_URL + 'questions', {}, {
                    'quests':{
                        method : 'POST',
                        headers: {
                            "Authorization" : bearer
                        }
                    }
                });
            };



            factory.getTemplates = function(){
                var bearer = "Bearer " + SessionService.getStoredUserToken();

                return $resource(MOD_IDN.REVIEW_API_URL + 'templates', {}, {
                    'get':{
                        method : 'GET',
                        isArray : true,
                        headers: {
                            "Authorization" : bearer
                        }
                    }
                });
            };




            factory.postTemplate = function(paramObj) {
                var bearer = "Bearer " + SessionService.getStoredUserToken();
                return $resource(MOD_IDN.REVIEW_API_URL + 'templates', {}, {
                    'template':{
                        method : 'POST',
                        headers: {
                            "Authorization" : bearer
                        }
                    }
                });
            };



            return factory;
        }]);