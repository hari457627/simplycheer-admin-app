'use strict';

angular.module('clientApp', [
        'ngAnimate',
        'ngResource',
        'ui.router',
        'ngMaterial',
        'md.data.table',
        'LocalStorageModule',
        'angular-loading-bar',
        'ngMessages',
        'underscore',
        

        'app.config',
        'mod.nbos',
        'mod.idn',
        'mod.app',
])

angular.module('clientApp')
.constant('CLIENT_CONFIG',{
        CLIENT_ID: 'c945b4e8-bafb-4b30-a707-612716337485',
        CLIENT_SECRET: 'simplycheer-secret',
        CLIENT_DOMAIN : 'http://localhost:5001'
})

