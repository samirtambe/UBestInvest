(function() {
    angular.module('Sapp').directive('forecastTitle', function() {

        return {

            restrict:'E',
            scope: {
                label: '='
            },
            template:"{{ label.title }}"
       };
    })

    .directive('stockGraph', function($window) {

        console.log("stockGraph Directive");

        return {

            restrict:'E',

            template:"<svg width='850' height='200'></svg>",

            link: function(scope, elem, attrs) {


            }
       };
    });
});
