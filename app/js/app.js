'use strict';

// Declare app level module which depends on views, and components
var thisApp = angular.module('thisApp', [
    'ui.router'
]);

thisApp.config(function($stateProvider, $urlRouterProvider) {

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

thisApp.controller('appController', ['$scope', function($scope) {

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

    //angular.element('[non-autofill-field=""]').focus();

}]);

thisApp.directive('nonAutofillField', ['$parse', function ($parse) {

    var isFocused = false;

    function link(scope, elem, attrs, ngModel) {
        console.log("fullscreen");
        // Binds focus event to element
        elem.bind("focus", function () {
            isFocused = true
        });

        // Listens to any changes in view
        ngModel.$viewChangeListeners.push(function () {
            if(!isFocused) {
                $parse(attrs.ngModel).assign(scope, ngModel.$setViewValue(""));
            }
        });
    }

    return {
        priority: 5,
        require: 'ngModel',
        link: link
    }
}]);

thisApp.directive('af', ['$timeout', function ($timeout) {

    function link(scope, elem) {
        $timeout(function () {
            console.log("focus");
            elem.focus();
        });
    }

    return {
        link: link
    }
}]);

thisApp.directive('fullscreen', ['$compile', function ($compile) {

    var link = function (scope, element) {
        // Compiles the icon button for opening the fullscreen mode
        var fullscreenButton = angular.element($compile(
            '<span class="pull-right">' +
                '<span name="fullscreen" ng-click="fullscreenMode($event)" tooltip="Expand" style="cursor: pointer"><i class="glyphicon glyphicon-fullscreen"></i></span>' +
            '</span>'
        )(scope));
        element.prepend(fullscreenButton)
    };
    var controller = function ($scope) {
        // Handles click event
        $scope.fullscreenMode = function (event) {
            var modalWrapper = '<modal-wrapper></modal-wrapper>';
            angular.element(event.target).closest('.block').wrap(modalWrapper);
            $compile(modalWrapper)($scope);
        };
    };

    return {
        restrict: 'C',
        link: link,
        controller: ['$scope', controller]
    }
}]);

thisApp.directive('modalWrapper',["$compile", "$document", function ($compile, $document) {

    /*
        Modal window template
     */
    var template =
        '<div id="modal-fullscreen" class="modal modal-fullscreen" style="background: white">' +
            '<div class="modal-header">' +
                '<button type="button" class="close" ng-click="close()">×</button>' +
            '</div>' +
            '<div class="modal-body row" style="margin: 0; display: flex;"></div>' +
        '</div>';

    /*
        Directive's link function
     */
    var link = function (scope, element) {

        scope.open();

        // Watches whether modal should be opened
        scope.$watch(
            function () {
                return scope.showModal
            },
            function (newVal) {
                var modalEl = $document.find('modal-wrapper');
                var fullscreenIcon = modalEl.find('[name="fullscreen"]');
                if (newVal) {                                               // Modal being opened
                    fullscreenIcon.addClass("ng-hide");                     // Hide fullscreen icon in modal
                    element.insertBefore(modalEl);                          // JQuery is required for using this function
                    element.find(".modal-body").append(modalEl.children()); // Put `block` element inside the modal
                    modalEl.remove();                                       // Remove <modal-wrapper> tag
                    angular.element('#modal-fullscreen').show();            // Make modal visible

                } else if (!newVal) {                                       // Modal being closed
                    fullscreenIcon.removeClass("ng-hide");                  // Show fullscreen icon after modal's closed
                    var modalBody = modalEl.find(".modal-body").children(); // Get `block` element
                    modalBody.insertBefore(modalEl);                        // Move `block` element
                    modalEl.remove();                                       // Remove modal
                }
        })
    };

    /*
        Directive's controller function
     */
    var controller = function ($scope) {

        $scope.open = function () {
            $scope.showModal = true;
        };

        $scope.close = function () {
            $scope.showModal = false;
        };

        // Close modal when back button's clicked
        $scope.$on('$locationChangeStart', function(event) {
            if ($scope.showModal) {
                event.preventDefault();
                $scope.close();
            }
        });

    };

    return {
        restrict: 'E',
        scope: {},
        template: template,
        link: link,
        controller: controller
    }

}]);
