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
                    show: true,
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    show: true,
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
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
                    show: true,
                    label: "My First dataset",
                    fillColor: "rgba(175,255,176,0.5)",
                    strokeColor: "rgba(175,255,176,1)",
                    highlightFill: "rgba(175,255,176,0.75)",
                    highlightStroke: "rgba(175,255,176,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    show: true,
                    label: "My Second dataset",
                    fillColor: "rgba(89,210,91,0.5)",
                    strokeColor: "rgba(89,210,91,1)",
                    highlightFill: "rgba(89,210,91,0.75)",
                    highlightStroke: "rgba(89,210,91,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        },
        {
            name: "chart3",
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    show: true,
                    label: "My First dataset",
                    fillColor: "rgba(226,175,175,0.5)",
                    strokeColor: "rgba(226,175,175,1)",
                    pointColor: "rgba(226,175,175,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(226,175,175,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    show: true,
                    label: "My Second dataset",
                    fillColor: "rgba(166,55,55,0.5)",
                    strokeColor: "rgba(166,55,55,1)",
                    pointColor: "rgba(166,55,55,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(166,55,55,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }
    ];

    $scope.showLegend = function () {
        return angular.element('div.fullscreen').hasClass('col-md-12');
    };

    /**
     * This method was written just to demonstrate scope behavior while switching states.
     *
     * @param chart should be updated.
     * @param dataset should be updated.
     */
    $scope.changeDataset = function (chart, dataset) {
        $.each($scope[chart.name].datasets, function (i, ds) {
            if (dataset.label === ds.label) {
                var fillColor = ds.fillColor;
                var strokeColor = ds.strokeColor;
                ds.fillColor = dataset.show ? fillColor.replace(',0)', ',0.5)') : fillColor.replace(",0.5)", ",0)");
                ds.strokeColor = dataset.show ? strokeColor.replace(',0)', ',1)') : strokeColor.replace(",1)", ",0)");
            }
        });
        $scope[chart.name].update();
    };

    var draw = function () {
        $.each($scope.data, function (i, v) {
            var ctx = angular.element('#' + v.name).get(0).getContext('2d');
            var chart = new Chart(ctx);
            $scope[v.name] = chart.Line(v, {
                responsive: true
            });
        });
    };

    var update = function () {
        $.each($scope.data, function (i, v) {
            $scope[v.name].render();
        });
    };

    $timeout(function () {
        draw();
    });

}]);