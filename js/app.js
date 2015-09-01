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
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
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
