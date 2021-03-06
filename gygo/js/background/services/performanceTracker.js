(function() {
  var e, r;
  e = ["underscore", "debug", "angular", "core/services/storage", "core/services/timeUtils", "core/services/domainUtils", "background/module", "background/services/proxyManager"], r = function(e, r, t) {
    var n, performanceTracker;
    return n = r("performanceTracker"), performanceTracker = function($rootScope, $timeout, $http, proxyManager, storage, timeUtils, domainUtils, ROLES, LOG_URL) {
      var r, a, i, o, s, d, u, l, c, m, p, f, y;
      return l = {}, u = {
        id: "",
        url: "",
        proxy: "",
        timeSendHeaders: -1,
        timeHeadersReceived: -1,
        timeEnded: -1,
        contentLength: 0,
        error: "",
        type: "latency"
      }, a = function() {
        return chrome.webRequest.onSendHeaders.addListener(d, {
          urls: ["<all_urls>"]
        }), chrome.webRequest.onHeadersReceived.addListener(s, {
          urls: ["<all_urls>"]
        }, ["responseHeaders"]), chrome.webRequest.onCompleted.addListener(i, {
          urls: ["<all_urls>"]
        }), chrome.webRequest.onErrorOccurred.addListener(o, {
          urls: ["<all_urls>"]
        }), m(), n("ready")
      }, c = function(e, r) {
        var t, n, a, i;
        i = [];
        for (n in r) a = r[n], t = {
          event: "proxy." + n,
          data: {
            sid: $rootScope.user.profile.sid,
            proxy: e
          }
        }, t.data[n] = a, i.push($http({
          method: "POST",
          url: LOG_URL,
          data: t
        }));
        return i
      }, r = function(e) {
        var r, t, a;
        if ("speed" === e.type) {
          if (e.error ? a = 3 : (a = e.contentLength / 1e3 / (e.timeEnded - e.timeHeadersReceived), c(e.proxy, {
              speed: parseInt(a)
            })), t = proxyManager.getProxyByName(e.proxy), !t) return;
          n("%s %s=%s", t.name, "speed", a), proxyManager.updateSpeed(t, a)
        } else {
          if (e.error || (r = 1e3 * (e.timeHeadersReceived - e.timeSendHeaders), c(e.proxy, {
              latency: r
            })), t = proxyManager.getProxyByName(e.proxy), !t) return;
          e.error ? (t.fail = Math.max(1, t.fail + 1), proxyManager.updateStability(t, 0)) : (t.fail = Math.min(-1, t.fail - 1), proxyManager.updateLatency(t, r), proxyManager.updateStability(t, 1)), n("%s %s=%s", t.name, "latency", r)
        }
        return delete l[e.id]
      }, d = function(e) {
        var r, n, a, i;
        return (n = e.url.indexOf("_HXPROXY_NAME=") > 0) ? (r = n && e.url.indexOf("bit_test") > 0, i = domainUtils.parseUri(e.url), a = t.copy(u), a.id = e.requestId, a.url = e.url, a.proxy = i.query._HXPROXY_NAME, a.timeSendHeaders = parseInt(e.timeStamp) / 1e3, a.type = r ? "speed" : "latency", l[e.requestId] = a) : void 0
      }, s = function(e) {
        var r, t, n, a, i, o;
        if (n = l[e.requestId]) {
          for (r = 0, o = e.responseHeaders, a = 0, i = o.length; i > a; a++)
            if (t = o[a], "content-length" === t.name.toLowerCase()) {
              r = parseInt(t.value);
              break
            }
          return n.timeHeadersReceived = parseInt(e.timeStamp) / 1e3, n.contentLength = r
        }
      }, o = function(e) {
        var t;
        return t = l[e.requestId], t ? (t.timeEnded = parseInt(e.timeStamp) / 1e3, t.error = e.error, r(t)) : void 0
      }, i = function(e) {
        var t;
        return t = l[e.requestId], t ? (t.timeEnded = parseInt(e.timeStamp) / 1e3, r(t)) : void 0
      }, y = {
        speed: {
          queue: [],
          doing: !1
        },
        latency: {
          queue: [],
          doing: !1
        }
      }, f = {}, p = function(e, r) {
        var t, n;
        if (n = y[r], !n.doing) {
          if (t = {
              method: "GET"
            }, "latency" === r) t.url = "https://" + e.host + ":" + e.port + "/info?_=" + Math.random() + "&_HXPROXY_NAME=" + e.name + "&_HXPROXY=DIRECT", t.timeout = 5e3;
          else {
            if ("speed" !== r) return;
            t.url = "https://" + e.host + ":" + e.port + "/bit_test?size=500000&_HXPROXY_NAME=" + e.name + "&_=" + Math.random() + "&_HXPROXY=DIRECT", t.timeout = 6e4
          }
          return n.doing = !0, $http(t)["finally"](function() {
            var t;
            return n.doing = !1, null == f[t = e.name] && (f[t] = {}), f[e.name][r] = timeUtils.time()
          })
        }
      }, m = e.once(function() {
        return function() {
          var e;
          return e = function() {
            var e, r, t, n, a, i, o, s, d, u, l, c, m, y, h;
            for (c = $rootScope.proxies, a = 0, s = c.length; s > a; a++) r = c[a], null == f[l = r.name] && (f[l] = {});
            for (m = $rootScope.proxies, i = 0, d = m.length; d > i; i++)
              if (r = m[i], t = Math.abs(r.fail), e = Math.min(300, 10 + 300 * Math.pow(t / 5, 2)), (f[r.name].latency || 0) + e < timeUtils.time()) {
                p(r, "latency");
                break
              }
            for (n = $rootScope.user.role === ROLES.VIP ? 900 : 3600, y = $rootScope.proxies, h = [], o = 0, u = y.length; u > o; o++) {
              if (r = y[o], r.speed < 0 || (f[r.name].speed || 0) + n < timeUtils.time()) {
                p(r, "speed");
                break
              }
              h.push(void 0)
            }
            return h
          }, setTimeout(function() {
            return setInterval(e, 1e3)
          }, 5e3)
        }
      }(this)), a(), window.testTimes = f, this
    }, t.module("background").service("performanceTracker", performanceTracker)
  }, define(e, r)
}).call(this);
