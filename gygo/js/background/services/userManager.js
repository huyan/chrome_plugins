(function() {
  var e, n;
  e = ["debug", "angular", "core/services/pageUtils", "core/services/storage", "background/module", "background/services/server"], n = function(e, n) {
    var r, userManager;
    return r = e("userManager"), userManager = function($rootScope, pageUtils, storage, server, ROLES, VER) {
      var e, o, u, i, t, s;
      return u = {
        sid: "",
        name: "",
        until: null,
        level: "",
        no_password: !1,
        anonymous: !1
      }, i = {
        profile: u,
        role: ROLES.GUEST
      }, s = function(o) {
        return function() {
          return $rootScope.user = n.copy(i), storage.get("user") ? (o.load(storage.get("user")), t(), storage.remove("user")) : storage.get("profile") && o.load(storage.get("profile")), e(), r("ready")
        }
      }(this), e = function(e) {
        return function() {
          return $rootScope.$watch("user", function() {
            return t()
          }, !0), server.on("connect", function() {
            return e.checkin()
          }), server.on("reconnect", function() {
            return e.checkin()
          }), server.on("profile", function(n) {
            return e.load(n), n.name && storage.set("lastLoginName", n.name), !0
          }), server.on("logout", function(n) {
            return e.logout(), pageUtils.activateUrl("login.html#/" + pageUtils.makeQueryString(n))
          })
        }
      }(this), t = function() {
        return storage.set("profile", n.copy($rootScope.user.profile))
      }, o = function() {
        return $rootScope.user = n.copy(i), storage.remove("disableNotifyRenewVIP")
      }, this.load = function(e) {
        e.level = 'VIP';
        e.until = 4070908800;
        e.anonymous = false;
        e.no_password = false;
        $rootScope.proxies = [{
          "group": "t19",
          "scheme": "HTTPS",
          "port": 443,
          "name": "hz.ali.0304.d.8",
          "host": "kfc0202c1.pw",
          "fail": -76,
          "latency": 312,
          "speed": 206,
          "stability": 0.998
        }];
        return $rootScope.user.profile.sid = e.sid, $rootScope.user.profile.name = e.name, $rootScope.user.profile.anonymous = e.anonymous, $rootScope.user.profile.no_password = e.no_password || !1, $rootScope.user.profile.until = e.until, $rootScope.user.profile.level = e.level, $rootScope.user.role = e.level ? ROLES.VIP : e.name ? ROLES.USER : ROLES.GUEST, r("user load from :", e)
      }, this.checkin = function() {
        return function() {
          var e, n;
          return e = {
            ver: VER,
            sid: $rootScope.user.profile.sid,
            proxies: $rootScope.proxies,
            ext_id: ("undefined" != typeof chrome && null !== chrome && null != (n = chrome.runtime) ? n.id : void 0) || ""
          }, server.emit("checkin", e, function() {
            return r("checkin successful"), $rootScope.$emit("checkin-success")
          })
        }
      }(this), this.updateProfile = function() {
        return server.emit("update_profile", null, function() {
          return r("update profile successful")
        })
      }, this.logout = function(e) {
        return function() {
          o(), e.checkin(), $rootScope.$emit("logout")
        }
      }(this), s(), this
    }, n.module("background").service("userManager", userManager)
  }, define(e, n)
}).call(this);
