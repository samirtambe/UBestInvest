(function() {

    angular.module('Sapp').filter('CheckFilter', function() {

        return function(input) {

            console.log('CheckFilter: INPUT = '+ input);

            return input ? '\u2713' : '\u2718';

        };

    });

}());
