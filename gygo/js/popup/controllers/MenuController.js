(function() {
  var n, e;
  n = ["angular", "core/services/pageUtils", "core/services/domainUtils", "core/services/tele", "popup/module"], e = function(n) {
    var e;
    return e = function($scope, $rootScope, $location, $translate, pageUtils, domainUtils, tele) {
      var n, e;
      return e = function() {
        var e;
        return $scope.blockedDomains = function() {
          var n, o, r, t;
          for (r = $rootScope.blockedDomains, t = [], n = 0, o = r.length; o > n; n++) e = r[n], t.push({
            name: e,
            selected: !0
          });
          return t
        }(), $scope.currentDomain = n($rootScope.currentTab), $scope.currentDomainIsAdded = "yes", tele.run("userDomains.match", $scope.currentDomain).then(function(n) {
          return n ? void 0 : $scope.currentDomainIsAdded = "no"
        }), $scope.state = $scope.blockedDomains.length > 0 ? "blocked" : "normal"
      }, $scope.addTooltip = {
        title: $translate.instant("popup.add_tooltip"),
        checked: !1
      }, n = function(n) {
        var e;
        if (null != n ? n.url : void 0) return e = domainUtils.parseUri(n.url).host, domainUtils.topDomain(e)
      }, $scope.openOptions = function() {
        return pageUtils.activateUrl("options.html", window.close)
      }, $scope.switchMode = function(n) {
        return n !== $rootScope.mode && ($rootScope.mode = n), !1
      }, $scope.addDomain = function(n) {
        return tele.run("userDomains.add", n).then(function() {
          return pageUtils.reloadCurrentTab(window.close)
        })
      }, $scope.remove = function(n) {
        return tele.run("userDomains.remove", n).then(function() {
          return pageUtils.reloadCurrentTab(window.close)
        })
      }, $scope.addSelectedDomains = function() {
        var n, e, o, r;
        for (e = _.pluck(_.where($scope.blockedDomains, {
            selected: !0
          }), "name"), o = 0, r = e.length; r > o; o++) n = e[o], tele.run("userDomains.add", n);
        return setTimeout(function() {
          return pageUtils.reloadCurrentTab(window.close)
        }, 500)
      }, $scope.routeToAdd = function() {
        return $location.path("/add/" + $scope.currentDomain)
      }, $scope.show_mode_tips = function(n) {
        return $scope.tips = "auto" === n ? $translate.instant("popup.auto_desc") : "always" === n ? $translate.instant("popup.always_desc") : "never" === n ? $translate.instant("popup.never_desc") : ""
      }, e()
    }, n.module("popup").controller("MenuController", e)
  }, define(n, e)
}).call(this);
