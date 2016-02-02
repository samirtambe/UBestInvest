angular.module('UBestInvest').controller('ResearchCtrl',
    ['$scope', 'HttpSvc', 'DateSvc', 'SpinnerSvc', 'GraphSvc',
     function($scope, HttpSvc, DateSvc, SpinnerSvc, GraphSvc) {

    $scope.showErrModal = false;

    $scope.errorModalDetails = undefined;

    $scope.pair = undefined;

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {

        pair: {symbol : undefined, name : undefined },
        todayDate : new Date(),
        howLongAgo: new Date(),
        duration: $scope.durations[0],
        startDate: '',
        endDate: ''
    };

    $(".btn").mouseup(function() {
         $(this).blur();
    });

    $scope.reqParams.todayDate
        .setDate($scope.reqParams.todayDate.getTime() - (24 * 60 * 60 * 1000));

    $scope.getGraph = function(validForm) {

        if (validForm == true) {

            var spinner = SpinnerSvc.getSpinner();//starts spinning

            $scope.reqParams.howLongAgo = DateSvc.calcBeginDate($scope);

            var tframe = DateSvc.formatDateShort($scope);

            $scope.reqParams.startDate = tframe.start;

            $scope.reqParams.endDate = tframe.end;


            var parentDiv = document.getElementById('stockChartDiv');

            try {
                var childSVG = document.getElementById('theSVG');

                parentDiv.removeChild(childSVG);
            }
            catch(error) {}


            HttpSvc.getStockData($scope.reqParams).then(function(dataset) {

                $scope.graphData = dataset.data;

                $scope.reqParams.pair.name = dataset.name;

                GraphSvc.createGraph('stocks', $scope.graphData);

            }).catch(function(errObj) {

                console.log("ResearchCtrl CATCH:" +
                            "\n\tHTTP: " + errObj.httpStatus +
                            "\n\tQUANDL Code: " + errObj.apiErrCode +
                            "\n\tQUANDL Message: " + errObj.apiErrMsg +
                            "\n\tModal Message: " + errObj.details);

                $scope.errorModalDetails = errObj.details;
                $scope.showErrModal = true;
                spinner.stop();

            }).finally(function() {

                $scope.reqParams.todayDate = new Date();
                $scope.reqParams.howLongAgo = new Date();
                $scope.reqParams.startDate = '';
                $scope.reqParams.endDate = '';
                spinner.stop();

            });
        }// if formValid
    };
}]);








angular.module('UBestInvest').controller('WeatherCtrl',
    ['$scope','HttpSvc', 'SpinnerSvc',
     function($scope, HttpSvc, SpinnerSvc) {

    $(".btn").mouseup(function() {
         $(this).blur();
        console.log("WeatherCtrl: blurring...");
    });

    $scope.weatherParams = {
        forecastType: '/conditions'
    };

    $scope.locations = [
        {displayName: "Atlanta, Georgia", stateCityStr: "GA/Atlanta"},
        {displayName: "Bangor, Maine", stateCityStr: "ME/Bangor"},
        {displayName: "Boston, Massachusetts", stateCityStr: "MA/Boston"},
        {displayName: "Chicago, Illinois", stateCityStr: "IL/Chicago"},
        {displayName: "Dallas, Texas", stateCityStr: "TX/Dallas"},
        {displayName: "Denver, Colorado", stateCityStr: "CO/Denver"},
        {displayName: "Houston, Texas", stateCityStr: "TX/Houston"},
        {displayName: "Las Vegas, Nevada", stateCityStr: "NV/Las_Vegas"},
        {displayName: "Los Angeles, California", stateCityStr: "CA/Los_Angeles"},
        {displayName: "Miami, Florida", stateCityStr: "FL/Miami"},
        {displayName: "New York, New York", stateCityStr: "NY/New_York"},
        {displayName: "Phoenix, Arizona", stateCityStr: "AZ/Phoenix"},
        {displayName: "Raleigh, North Carolina", stateCityStr: "NC/Raleigh"},
        {displayName: "San Francisco, California", stateCityStr: "CA/San_Francisco"},
        {displayName: "Seattle, Washington", stateCityStr: "WA/Seattle"},
        {displayName: "Washington, D.C.", stateCityStr: "DC/Washington"}
    ];

    $scope.weatherParams.selectedLocation = $scope.locations[0];

    $scope.getWeather = function() {

        var spinner = SpinnerSvc.getSpinner();

        HttpSvc.getWeatherData($scope.weatherParams).then(function(result) {

            $scope.weather = result.current_observation;

        }).catch(function(error) {

            console.log("WeatherCtrl - Current Conditions - Catch: " + error);

            spinner.stop();
        });


        // Change parameter for next request to be 3 day forcast
        $scope.weatherParams.forecastType = "/forecast";


        HttpSvc.getWeatherData($scope.weatherParams).then(function(result) {

            $scope.threeForecast = result.forecast.simpleforecast.forecastday;

        }).catch(function(error) {

            console.log("WeatherCtrl - 3 Day Forecast - Catch: " + error);

            spinner.stop();
        });

        //revert back directly after the query has been sent
        $scope.weatherParams.forecastType = "/conditions";

        spinner.stop();

    };// getWeather()
}]);





angular.module('UBestInvest').controller('HomeCtrl', ['$scope', 'HttpSvc', 'SpinnerSvc',
    function($scope, HttpSvc, SpinnerSvc) {

    var spinner = SpinnerSvc.getSpinner();

    $scope.currentPage = 0;

    $scope.pageSize = 5;

    HttpSvc.getNewsLocal(null).then(function(data) {

        $scope.articles = data;

    }).catch(function() {

        console.log("Home Catch:"+error);
        spinner.stop();

    }).finally(function() {

        $scope.numberOfPages = function() {
            return Math.ceil($scope.articles.length/$scope.pageSize);
        };

        spinner.stop();
    });
}]);


angular.module('UBestInvest').controller('BizNewsCtrl', ['$scope', 'HttpSvc', 'SpinnerSvc',
    function($scope, HttpSvc, SpinnerSvc) {

    var spinner = SpinnerSvc.getSpinner();

    HttpSvc.getNewsBusiness(null).then(function(data) {

        $scope.bizarticles = data;

    }).catch(function() {

        console.log("BizNewsCtrl Catch:"+error);
        spinner.stop();

    }).finally(function() {
        spinner.stop();
    });
}]);


angular.module('UBestInvest').controller('MarketCtrl',
    ['$scope', 'DateSvc', 'HttpSvc', 'SpinnerSvc',
        function($scope, DateSvc, HttpSvc, SpinnerSvc) {

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {
        todayDate : new Date(),
        howLongAgo: new Date(),
        duration: $scope.durations[1],
        startDate: '',
        endDate: ''
    };

    $scope.reqParams.todayDate = new Date($scope.reqParams.todayDate.getTime() - (24 * 60 * 60 * 1000));
console.log('t:'+$scope.reqParams.todayDate);
    $scope.reqParams.howLongAgo = DateSvc.calcBeginDate($scope);
console.log('h:'+$scope.reqParams.howLongAgo);

    var tframe = DateSvc.formatDateShort($scope);

    $scope.reqParams.startDate = tframe.start;

    $scope.reqParams.endDate = tframe.end;



    $scope.populateHomeGraphs = function(graphType) {

        var spinner = SpinnerSvc.getSpinner();

        HttpSvc.getHomeGraphData(graphType, $scope.reqParams).then(function(data) {

            $scope.graphData = data;

        }).catch(function(error) {

            console.log("Catch - [ "+graphType+" ]: " + error);
            spinner.stop();

        }).finally(function() {

            $scope.reqParams.todayDate = new Date();
            $scope.reqParams.howLongAgo = new Date();
            $scope.reqParams.startDate = '';
            $scope.reqParams.endDate = '';

            spinner.stop();
        });
    }
}]);
