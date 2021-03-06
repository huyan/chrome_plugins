(function() {
  var r, e;
  r = ["underscore", "angular", "lang", "angular_translate", "core/directives/focusBind", "core/directives/formState", "core/directives/equals", "login/controllers/LoginPageController", "login/controllers/LoginController", "login/controllers/RegisterController"], e = function(r, e, o) {
    return e.module("login").config(function($routeProvider, $translateProvider) {
      return $routeProvider.when("/login", {
        templateUrl: "/partials/login/login.html",
        controller: "LoginController"
      }).when("/register", {
        templateUrl: "/partials/login/register.html",
        controller: "RegisterController"
      }).otherwise({
        redirectTo: "/login"
      }), o.config($translateProvider)
    }), e.element(document).ready(function() {
      return e.bootstrap(document, ["login"])
    })
  }, require(["../config"], function() {
    return requireWithRetry(r, e)
  })
}).call(this);
