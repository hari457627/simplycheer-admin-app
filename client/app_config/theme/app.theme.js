'use strict';

angular.module('app.theme', []);

angular.module('app.theme')
.config(['$mdThemingProvider', function ($mdThemingProvider) {

    var myAccent = {
        '50': '#57521d',
        '100': '#6a6424',
        '200': '#7d762a',
        '300': '#908831',
        '400': '#a39a37',
        '500': '#b6ac3e',
        '600': '#c8bf5e',
        '700': '#cfc771',
        '800': '#d5cf84',
        '900': '#dcd697',
        'A100': '#4DB6AC',
        'A200': '#009688',
        'A400': '#00796B',
        'A700': '#004D40',
        'contrastDefaultColor': 'light',
    };
    $mdThemingProvider
        .definePalette('myAccent',
            myAccent);


    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
        .accentPalette('myAccent')
        .warnPalette('red');

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('deep-orange')
            .accentPalette('green')
            .warnPalette('red')
            .dark();

    }]);