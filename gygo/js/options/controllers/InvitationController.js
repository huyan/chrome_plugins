(function() {
  var t, n;
  t = ["angular", "options/module"], n = function(t) {
    var n;
    return n = function($scope, $rootScope, $http, $timeout, invitationManager, SERVER) {
      var t;
      return $scope.inviter = "", $scope.tempInviter = "", $scope.showInviterInput = !1, $scope.focusInviterInput = !1, $scope.invitationList = null, $scope.invite_url = "", t = function() {
        return invitationManager.queryInviter(function(t) {
          return $scope.inviter = t
        }), invitationManager.queryInvitationList(), $http({
          method: "POST",
          url: "https://" + SERVER + "/user/invite_url",
          params: {
            sid: $rootScope.user.profile.sid
          }
        }).success(function(t) {
          return t.url ? $scope.invite_url = t.url : void 0
        })
      }, $scope.fetchInvitationReward = function(t) {
        return $http({
          method: "POST",
          url: "https://" + SERVER + "/user/fetch_invitation_reward",
          params: {
            sid: $rootScope.user.profile.sid,
            invitation_id: t._id
          }
        }).success(function() {
          return t.can_fetch_reward = !1
        })
      }, t()
    }, t.module("options").controller("InvitationController", n)
  }, define(t, n)
}).call(this);
