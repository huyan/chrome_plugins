(function() {
  var s, o;
  s = ["angular", "options/module"], o = function(s) {
    var o;
    return o = function($scope, $rootScope, $http, SERVER, $translate) {
      return $scope.oldPassword = "", $scope.newPassword = "", $scope.rePassword = "", $scope.focuses = {
        oldPassword: !0,
        newPassword: !1
      }, $scope.alert = $scope.$parent.alert, $scope.closeModal = $scope.$parent.closeModal, $scope.submitChangePassword = function() {
        return $scope.oldPassword ? $scope.newPassword ? $scope.newPassword !== $scope.rePassword ? ($scope.alert($translate.instant("options.change_password.alert.password2_not_same")), $scope.focuses.newPassword = !0, !1) : ($scope.disableInput = !0, $http({
          method: "POST",
          url: "https://" + SERVER + "/user/password",
          params: {
            old: $scope.oldPassword.trim(),
            "new": $scope.newPassword.trim(),
            sid: $rootScope.user.profile.sid
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).success(function(s) {
          return $scope.disableInput = !1, s.error ? ($scope.alert(s.message), "PASSWORD_INVALID" === s.error ? $scope.focuses.oldPassword = !0 : "NEW_PASSWORD_TOO_SHORT" === s.error ? $scope.focuses.newPassword = !0 : void 0) : ($scope.alert($translate.instant("options.change_password.alert.success_change"), "success"), $scope.isChangingPassword = !1, $scope.closeModal(), $rootScope.user.profile.sid = s.new_sid)
        }).error(function() {
          return $scope.disableInput = !1, $scope.isChangingPassword = !1, $scope.alert($translate.instant("options.change_password.alert.connection_failed"))
        }), $scope.disableInput = !1, !0) : ($scope.focuses.newPassword = !0, $scope.alert($translate.instant("options.change_password.alert.new_password_short")), !1) : ($scope.focuses.oldPassword = !0, $scope.alert($translate.instant("options.change_password.alert.old_password_error")), !1)
      }, $scope.cancelChangePassword = function() {
        return $scope.isChangingPassword = !1, $scope.closeModal()
      }
    }, s.module("options").controller("ChangePasswordController", o)
  }, define(s, o)
}).call(this);
