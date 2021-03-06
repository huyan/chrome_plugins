(function() {
  var e, t;
  e = ["angular", "core/services/validate", "core/services/generate", "core/services/tele", "options/module"], t = function(e) {
    var t;
    return t = function($scope, $rootScope, $http, $timeout, $interval, validate, generate, tele) {
      var e;
      return $rootScope.deltaTime = 0, tele.scope("deltaTime"), $scope.VIPLeft = 0, $scope.stabilityLevel = function() {
        return Math.round(5 * $rootScope.averageStability)
      }, $scope.avatarUrl = function() {
        var e, t;
        return e = "/img/logo.png", t = $rootScope.user.profile.name, validate.email(t) ? "/img/logo.png" : e
      }, (e = function() {
        return $scope.VIPLeft = $rootScope.isVIP() ? $rootScope.user.profile.until : 0, $rootScope.$watch("user.profile.until", function(t, r) {
          var n, i, o;
          return t !== r ? (e(), i = new Date, i = parseInt((i.getTime() - $rootScope.deltaTime) / 1e3), (!r || i > r) && (r = i), $scope.VIPLeft = r, o = 30, n = 0, $interval(function() {
            return n += 1, $scope.VIPLeft = (r + (t - r) * n / o).toFixed(0)
          }, 50, o)) : void 0
        })
      })()
    }, e.module("options").controller("ProfileController", t)
  }, define(e, t)
}).call(this);
