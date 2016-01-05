'use strict';

var directives = angular.module('ae.directives', []);

/**
 *
 */
directives.directive('nonAutofillField', ['$parse', function ($parse) {

    var isFocused = false;

    function link(scope, elem, attrs, ngModel) {
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
directives.directive('fullscreenBlock', ['$compile', function ($compile) {

    var link = function (scope, element, attrs) {
        // Compiles DEFAULT icon button for opening the fullscreen mode.
        // fullscreenButton can be overridden by passing html code as a value of `fullscreen-block` attribute.
        var fullscreenButton = function () {
            return angular.element($compile(
                '<div class="row">' +
                    '<div class="col-md-10 col-sm-10 col-xs-10">' +
                        // Scope information
                        '<p>(scope id: <b>' + scope.$id + '</b>)</p>' +
                        '<p>(parent scope id: <b>' + scope.$parent.$id + '</b>)</p>' +
                    '</div>' +
                    '<div class="col-md-2 col-sm-2 col-xs-2">' +
                        '<span class="pull-right" name="fullscreen" ng-click="fullscreenMode($event)" tooltip="Expand" style="cursor: pointer"><i class="glyphicon glyphicon-fullscreen"></i></span>' +
                    '</div>' +
                '</div>'
            )(scope));
        };

        element.prepend((attrs.fullscreenBlock.length > 0) ? attrs.fullscreenBlock : fullscreenButton());
    };

    // Function helps to find the first parent element
    // which contains 'fullscreen-block' attribute.
    // This function can be replaced with JQuery's `closest()` method
    // if JQuery library is in use.
    var closest = function (element) {
        return (angular.element(element).parent().attr('fullscreen-block') !== undefined) ?
            angular.element(element).parent() :
            closest(angular.element(element).parent());
    };

    var controller = function ($scope) {
        // Handles click event
        $scope.fullscreenMode = function (event) {
            var modalWrapper = '<modal-wrapper></modal-wrapper>';
            angular.element(closest(event.target)).wrap(modalWrapper);
            $compile(modalWrapper)($scope);
        };
    };

    return {
        link: link,
        controller: ['$scope', '$timeout', controller]
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

    var chart;

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
                // Modal being opened
                if (newVal) {
                    // Hide fullscreen icon in modal
                    fullscreenIcon.addClass("ng-hide");
                    modalEl[0].parentNode.insertBefore(element[0], modalEl[0]);
                    // Gets content to be shown in fullscreen
                    var content = modalEl.children();
                    element.find(".modal-body").append(content);
                    // Remove <modal-wrapper> tag
                    modalEl.remove();
                    // Make modal visible
                    angular.element('#modal-fullscreen').show();
                    // changing element's width
                    content.addClass('expand');
                    // initializing chart variable.
                    // Following line is suitable just for this concrete case.
                    chart = content.scope()[element.find('canvas').attr('id')];
                // Modal being closed
                } else if (!newVal) {
                    // Show fullscreen icon after modal's closed
                    fullscreenIcon.removeClass("ng-hide");
                    var modalBody = modalEl.find(".modal-body").children();
                    modalEl[0].parentNode.insertBefore(modalBody[0], modalEl[0]);
                    // Remove modal
                    modalEl.remove();
                    // changing element's width
                    modalBody.removeClass('expand');
                }
                // Triggers chart's resizing.
                // Following line is suitable just for this concrete case.
                chart.resize(chart.render, true);
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