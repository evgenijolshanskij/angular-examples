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
        var fullscreenButton = angular.element($compile(
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
        element.prepend((attrs.fullscreenBlock.length > 0) ? attrs.fullscreenBlock : fullscreenButton);
    };

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
                if (newVal) {                                               // Modal being opened
                    fullscreenIcon.addClass("ng-hide");                     // Hide fullscreen icon in modal
                    modalEl[0].parentNode.insertBefore(element[0], modalEl[0]);
                    var content = modalEl.children();                       // Gets content to be shown in fullscreen
                    content.removeClass('col-md-4');                        // Resize content
                    content.addClass('col-md-12');                          // Resize content
                    element.find(".modal-body").append(content);            // Put `block` element inside the modal
                    modalEl.remove();                                       // Remove <modal-wrapper> tag
                    angular.element('#modal-fullscreen').show();            // Make modal visible
                    // Actions needed only for chart
                    chart = content.scope()[element.find('canvas').attr('id')];
                    chart.resize(chart.render, true);

                } else if (!newVal) {                                       // Modal being closed
                    fullscreenIcon.removeClass("ng-hide");                  // Show fullscreen icon after modal's closed
                    var modalBody = modalEl.find(".modal-body").children(); // Get `block` element
                    modalBody.removeClass('col-md-12');                     // Resize content
                    modalBody.addClass('col-md-4');                         // Resize content
                    modalEl[0].parentNode.insertBefore(modalBody[0], modalEl[0]);
                    modalEl.remove();                                       // Remove modal
                    // Actions needed only for chart
                    chart.resize(chart.render, true);
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