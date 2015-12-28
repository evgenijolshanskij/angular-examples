'use strict';

angular.module('ae.controllers', []);
angular.module('ae.directives', []);

// Declare app level module which depends on views, and components
var ae = angular.module('ae', [
    'ui.router',
    'ae.controllers',
    'ae.directives'
]);

ae.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/fullscreen-mode');

    $stateProvider
        .state('fullscreenMode', {
            url: '/fullscreen-mode',
            templateUrl: 'views/fullscreen-mode.html'
        })
        .state('autofill', {
            url: '/autofill',
            templateUrl: 'views/autofill.html'
        })
        .state('state1', {
            url: '/state1',
            templateUrl: 'view1/view1.html'
        })
        .state('state2', {
            url: '/state2',
            templateUrl: 'view2/view2.html'
        })

});
