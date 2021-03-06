(function() {
  var t, r;
  t = ["angular", "core/module"], r = function(t) {
    var storage;
    return storage = function() {
      return this.set = function() {
        return function(r, n) {
          return localStorage[r] = JSON.stringify(t.copy(n)), n
        }
      }(this), this.get = function() {
        return function(t, r) {
          var n;
          if (null == r && (r = void 0), void 0 === localStorage[t]) return r;
          try {
            return JSON.parse(localStorage[t])
          } catch (e) {
            return n = e, r
          }
        }
      }(this), this["default"] = function() {
        return function(t, r) {
          return null == localStorage[t] && (localStorage[t] = r), localStorage[t]
        }
      }(this), this.remove = function() {
        return function(t) {
          return localStorage.removeItem(t)
        }
      }(this), this
    }, t.module("core").service("storage", storage)
  }, define(t, r)
}).call(this);
