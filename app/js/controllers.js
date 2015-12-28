'use strict';

var controllers = angular.module('ae.controllers', []);

controllers.controller('AutofillController', ['$scope', function($scope) {

    $scope.users = [
        {
            id: 1,
            name: 'John',
            surname: 'Connor',
            username: 'Username777',
            city: 'NewYork',
            email: 'mail@domain.com',
            password: '',
            repassword: ''
        },
        {
            id: 2,
            name: 'Sarah',
            surname: 'Connor',
            username: 'Username333',
            city: 'NewYork',
            email: 'mail2@domain.com',
            password: '',
            repassword: ''
        },
        {
            id: 3,
            name: 'Kyle',
            surname: 'Reese',
            username: 'Username555',
            city: 'NewYork',
            email: 'mail3@domain.com',
            password: '',
            repassword: ''
        }
    ];

    $scope.submit = function () {
        console.log("Submitting...");
        // Do something useful ...
    };

}]);

controllers.controller('FullscreenModeController', ['$scope', function ($scope) {

}]);