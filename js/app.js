(function() {
    angular.module('Sapp',['ui.router','firebase','ngResource']);

    console.log("Created Sapp angular module");

    angular.module('Sapp').config(

        function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html'
        })
        .state('home.simpleList', {
            url: '/simple',
            templateUrl: 'views/biz-list.html',
            controller: 'MainController'
        })
        .state('home.weather', {
            url: '/weather',
            templateUrl: 'views/oldweather.html',
            controller: 'WeatherController'
        })
        .state('finance', {
            url: '/finance',
            views: {
                // Parent Container
                '': {
                    templateUrl: 'views/finance.html'
                },
                'leftCol@finance': {
                    templateUrl:'views/stocklist.html',
                    controller: 'StockListController'
                },
                'rightCol@finance': {
                    templateUrl:'views/stockdetail.html',
                    controller:'StockDetailController'
                }
            }
        });
    });
}());
