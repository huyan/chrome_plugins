(function() {
  var e, t;
  e = ["angular", "core/module"], t = function(e) {
    var t;
    return t = function($rootScope, $translate) {
      var e;
      return e = setTimeout(function() {
        return alert($translate.instant("common.startup_failed"))
      }, 3e3), $rootScope.$on("$routeChangeSuccess", function(t, n, r) {
        return console.log("$routeChangeSuccess", n, r), n.$$route ? clearTimeout(e) : void 0
      }), $rootScope.$on("$stateChangeSuccess", function() {
        return clearTimeout(e)
      }), this
    }, e.module("core").service("corruptDetector", t)
  }, define(e, t)
}).call(this);
