(function() {
  var t, n;
  t = ["angular", "options/module"], n = function(t) {
    var n;
    return n = function($scope, $rootScope, $http, SERVER) {
      return $scope.trades = null, $scope.init = function() {
        return $http.get("https://" + SERVER + "/pay/list?sid=" + $rootScope.user.profile.sid).success(function(t) {
          return t.trade_list ? $scope.trades = t.trade_list : void 0
        })
      }, $scope.init()
    }, t.module("options").controller("TradeListController", n)
  }, define(t, n)
}).call(this);
