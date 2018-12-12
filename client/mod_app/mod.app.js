
angular.module('mod.app', []);


angular.module('mod.app')

    .constant('MOD_APP', {
        API_URL: '',
        API_URL_DEV: ''
    })

    .config(['$stateProvider', function ($stateProvider) {



        $stateProvider
            .state('app', {
                url: '/app',
                parent:'layout',
                template: '<div ui-view></div>',
                data: {
                    type: "home"
                }
            })
            //FOR NAVIGATION
           .state('app.header', {
               url: '',
               template: "<div></div>",
               data: {
                   templateUrl:'mod_app/views/menu/app.header.html',
                   position: 1,
                   enabled : true,
                   type: 'header',
                   name: "App",
                   module: "Dashboard"
               }
           })
           //FOR ROUTES


            .state('app.Templates', {
                url: '/Templates',
                templateUrl: "mod_app/views/dashboard/Templates_List.html",
                data: {
                    type: 'home',
                    menu:true,
                    name: 'my templates',
                    module: "Templates"
                }
            })


            .state('app.questions', {
                url: '/questions/createQuestions',
                templateUrl: "mod_app/views/dashboard/QuestionsList.html",
                data: {
                    type: 'home',
                    menu: true,
                    disabled : false,
                    module: "Questions",
                    name:"My Questions"
                }
            })



            .state('app.adduser', {
                url: '/adduser',
                templateUrl: "mod_app/views/dashboard/register.html",
                controller:'RegisterCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            })


            .state('app.dashboard', {
                url: '/dash',
                templateUrl: "mod_app/views/dashboard/app.dashboard.html",
                data: {
                    type: 'home',
                    menu: true,
                    disabled : false,
                    name: "Manage Users",
                    module: "Settings"
                }
            })


            .state('app.createTemplate', {
                url: '/createTemplate/',
                templateUrl: "mod_app/views/dashboard/CreateTemplate.html",
                controller:'TemplatesListCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            })

            .state('app.Scratch', {
                url: '/Scratch/',
                templateUrl: "mod_app/views/dashboard/TemplateView.html",
                controller:'TemplatesListCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            })

            .state('app.CreateQuestions', {
                url: '/CreateQuestions/',
                templateUrl: "mod_app/views/dashboard/app.questions.html",
                controller:'QuestionsListCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            });

    }])
