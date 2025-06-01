/// <reference path="../angular-route.min.js" />
/// <reference path="../angular.min.js" />


var app = angular.module("myApp", ['ngSanitize', 'ngRoute','ngPatternRestrict','ui.bootstrap']);
app.directive('select2', function ($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            function initializeSelect2() {
                $(element).select2();
                // Trigger Angular model update on change
                $(element).on('change', function () {
                    scope.$applyAsync(function () {
                        ngModel.$setViewValue($(element).val());
                    });
                });
                // Set initial value if model has it
                $timeout(function () {
                    if (ngModel.$viewValue) {
                        $(element).val(ngModel.$viewValue).trigger('change');
                    }
                }, 100);
            }
            $timeout(function () {
                initializeSelect2();
            }, 100);

            // Watch model updates (e.g., from DB)
            scope.$watch(attrs.ngModel, function (newVal) {
                $timeout(function () {
                    $(element).val(newVal).trigger('change');
                }, 0);
            });

            // Watch for external model updates (e.g., from DB)
            scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $timeout(function () {
                        // Only trigger if needed
                        if ($(element).val() !== newVal) {
                            $(element).val(newVal).trigger('change');
                        }
                    }, 0);
                }
            });

            // Handle focus if required and empty on validation attempt
            scope.$watch(function () {
                return ngModel.$error.required && ngModel.$dirty;
            }, function (isInvalid) {
                console.log("isInvalid =", isInvalid);
                if (isInvalid && !ngModel.$viewValue) {
                    $timeout(function () {
                        console.log("isInvalid =", isInvalid);
                        $(element).select2('open');
                    }, 0);
                }
            });

            // Clean up on destroy
            scope.$on('$destroy', function () {
                $(element).off().select2('destroy');
            });
        }
    };
});
app.config(function ($routeProvider) {
   

    $routeProvider.when('/test1', {
        templateUrl: '/Home/Index',
        controller: 'homeIndexCntrl'
    })
       //.when('/test2', {
       //    templateUrl: 'EmployeeGenerateForm.cshtml',
       //    controller: 'HomeCtrl'
       //})

       //.when('/test3', {
       //    templateUrl: 'test3.html',
       //    controller: 'ngtemplatectrl'
       //}).
       //    otherwise({
       //        redirectTo: '/test2'
       //    });
       })
app.directive('ddTextCollapse', ['$compile', function ($compile) {


    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {


            /* start collapsed */
            scope.collapsed = false;


            /* create the function to toggle the collapse */
            scope.toggle = function () {
                scope.collapsed = !scope.collapsed;
            };


            /* wait for changes on the text */
            attrs.$observe('ddTextCollapseText', function (text) {


                /* get the length from the attributes */
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);


                if (text.length > maxLength) {
                    /* split the text in two parts, the first always showing */
                    var firstPart = String(text).substring(0, maxLength);
                    var secondPart = String(text).substring(maxLength, text.length);


                    /* create some new html elements to hold the separate info */
                    var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "Less" : "Read more"}}</span>')(scope);


                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    element.append(lineBreak);
                    element.append(toggleButton);
                }
                else {
                    element.empty();
                    element.append(text);
                }
            });
        }
    };
}]);
app.controller('ngtemplatectrl', function ($scope) {

        $scope.text = 'Hello';
    
});


  
