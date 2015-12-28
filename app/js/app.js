'use strict';

angular.module('ae.directives', []);
angular.module('ae.controllers', []);

// Declare app level module which depends on views, and components
var ae = angular.module('ae', [
    'ui.router',
    'ae.directives',
    'ae.controllers'
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
