(function() {
  var r, n, o = [].indexOf || function(r) {
    for (var n = 0, o = this.length; o > n; n++)
      if (n in this && this[n] === r) return n;
    return -1
  };
  r = ["debug", "angular", "core/services/tele", "core/services/domainUtils", "core/services/validate", "options/module"], n = function(r, n) {
    var t, i;
    return i = r("DomainListController"), t = function($scope, $rootScope, $translate, tele, domainUtils, validate, GUEST_DOMAINS) {
      var r;
      return tele.scope("domains", {
        list: !0
      }), $scope.domainToAdd = "", $scope.filteredDomains = [], $scope.sorter = "name", $scope.error = "", $scope.dropdown = [{
        text: $translate.instant("options.domain_list.sort_by_char"),
        click: "setSorter('name')"
      }, {
        text: $translate.instant("options.domain_list.sort_by_time"),
        click: "setSorter('-_mtime')"
      }], r = function() {
        var r;
        return $rootScope.isVIP() ? void 0 : ($scope.guestDomains = function() {
          var n, o, t;
          for (t = [], n = 0, o = GUEST_DOMAINS.length; o > n; n++) r = GUEST_DOMAINS[n], t.push({
            name: r
          });
          return t
        }(), $scope.filteredDomains = _.filter($rootScope.domains, function(r) {
          var n;
          return !r._deleted && (n = r.name, o.call(GUEST_DOMAINS, n) < 0)
        }))
      }, r(), $scope.addDomain = function() {
        var r, n;
        return $rootScope.isVIP() ? (r = domainUtils.trimDomain($scope.domainToAdd), r ? validate.domain(r) ? (n = _.findWhere($rootScope.domains, {
          name: r
        }), n ? $scope.error = $translate.instant("options.domain_list.error.domain_added") : (tele.run("userDomains.add", r), $scope.domainToAdd = "")) : $scope.error = $translate.instant("options.domain_list.error.format") : $scope.error = $translate.instant("options.domain_list.error.empty")) : void 0
      }, $scope.clearError = function() {
        return $scope.error = ""
      }, $scope.setSorter = function(r) {
        return $scope.sorter = r
      }
    }, n.module("options").controller("DomainListController", t)
  }, define(r, n)
}).call(this);
