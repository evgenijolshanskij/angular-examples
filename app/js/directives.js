'use strict';

var directives = angular.module('directives.directives', []);

/**
 *
 */
directives.directive('nonAutofillField', ['$parse', function ($parse) {

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

/**
 *
 */
directives.directive('fullscreen', ['$compile', function ($compile) {

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

/**
 *
 */
directives.directive('modalWrapper',["$compile", "$document", function ($compile, $document) {

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