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

controllers.controller('FullscreenModeController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.data = [
        {
            name: "chart1",
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        },
        {
            name: "chart2",
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        },
        {
            name: "chart3",
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }
    ];

    var draw = function () {
        $.each($scope.data, function (i, v) {
            var ctx = $('#' + v.name).get(0).getContext('2d');
            var chart = new Chart(ctx);
            $scope[v.name] = chart.Line(v, {
                responsive: true
            });
        });
    };

    $timeout(function () {
        draw();
    });

}]);