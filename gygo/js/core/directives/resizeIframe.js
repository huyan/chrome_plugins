(function() {
  var e, r;
  e = ["angular", "core/module"], r = function(e) {
    var r;
    return r = function($window) {
      return {
        restrict: "E",
        scope: {
          src: "="
        },
        template: '<div height="100%" style="margin-top:10px"><iframe width="100%" height="500" frameborder="0" src=""></iframe></div>',
        link: function(r, i) {
          var t, n, a;
          return t = i.find("iframe"), t[0].src = r.src, a = i.parent().parent(), n = function() {
            return t[0].height = a[0].offsetHeight - 20
          }, e.element($window).bind("resize", n), n()
        }
      }
    }, e.module("core").directive("resizeIframe", r)
  }, define(e, r)
}).call(this);
