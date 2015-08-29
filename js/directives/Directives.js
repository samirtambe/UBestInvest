(function() {
    angular.module('Sapp').directive('stockGraph', function () {
        console.log("Running stockGraph Directive");
        return {
            restrict: 'E',
            scope: {
                //stocksymbol: '='
            },
            templateUrl: 'views/stock-graph.html'
        };
    });
});
