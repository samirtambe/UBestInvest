(function() {
    angular.module('Sapp',['ui.router','firebase','ngResource']);

    console.log("Created Sapp angular module");

    angular.module('Sapp').config(

        function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/main_menu.html'
        })
        .state('weather', {
            url: '/weather',
            views: {
                // Parent Container
                '': {
                    templateUrl: 'views/weather.html'
                },
                'leftWeather@weather': {
                    templateUrl:'views/leftweather.html',
                    controller: 'WeatherController'
                },
                'rightWeather@weather': {
                    templateUrl:'views/rightweather.html'//,
                    //controller:'StockDetailController'
                }
            }
        })
        .state('finance', {
            url: '/finance',
            templateUrl: 'views/finance.html',
            controller: 'StockListController'
        });

    });
}());
/*
        .state('home.simpleList', {
            url: '/simple',
            templateUrl: 'views/biz-list.html',
            controller: 'MainController'
        })
        .state('home.weather', {
            url: '/weather',
            templateUrl: 'views/oldweather.html',
            controller: 'WeatherController'
        })*/
