'use strict';

angular.module('app.config', [
    'app.layout',
    'app.theme'
]);


angular.module('app.config')
    .value('APP_CONFIG', {})
    .value('APP_ENV', {})
    .constant('APP_CONSTANTS', {
        API_URL: 'http://api.qa1.nbos.io/',
        API_URL_DEV: 'http://api.qa1.nbos.io/',
        TENANT_ID: 'TNT:CWC-0ncoum9w',
        GRANT_TYPE: 'client_credentials',
        SCOPE: '',
        APP_SESSION_KEY: 'THIS_SHOULD_BE_RANDOM_GENERATED_',
        APP_LOGO : '',
        APP_BANNER:'',
        REVIEW_API_URL:'http://10.9.8.179:3010/'
    })

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "app_config/firstPage/firstPage.html",
                controller: 'FirstPageCtrl',
                data: {
                    type: 'login',
                    authenticate: false
                }
            })
    }]);
