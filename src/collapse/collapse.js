angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition'])

  .directive('collapse', ['$q', function ($q) {

      return {
          link: function (scope, element, attrs) {

              var initialAnimSkip = true;

              function expand() {
                  if (initialAnimSkip) {
                      initialAnimSkip = false;
                      expandDone();
                  } else {
                      var deferred = $q.defer();
                      element.slideDown({ done: deferred.resolve });
                      deferred.promise.then(function () {
                          expandDone();
                      });
                  }
              }

              function expandDone() {
                  element.css({ height: 'auto' });
              }

              function collapse() {
                  if (initialAnimSkip) {
                      initialAnimSkip = false;
                      collapseDone();
                  } else {
                      var deferred = $q.defer();
                      element.slideUp({ done: deferred.resolve });
                      deferred.promise.then(function () {
                          collapseDone();
                      });
                  }
              }

              function collapseDone() {
                  element.height(0);
              }

              scope.$watch(attrs.collapse, function (shouldCollapse) {
                  if (shouldCollapse) {
                      collapse();
                  } else {
                      expand();
                  }
              });
          }
      };
  }]);
