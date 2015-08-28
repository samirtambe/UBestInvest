(function() {

    angular.module('Sapp').filter('CheckFilter', function() {

        return function(input) {
            console.log('CheckFilter: INPUT = '+ input);
            // if the input is less than 50 dollars per share then return checkmark
            //else return an X
            return (input < 50) ? '\u2713' : '\u2718';
        };
    });
}());
