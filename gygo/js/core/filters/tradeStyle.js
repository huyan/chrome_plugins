(function() {
  var n, r;
  n = ["angular", "core/module"], r = function(n) {
    var r;
    return r = function() {
      return function(n) {
        var r;
        return r = "", "INIT" === n || "WAIT_BUYER_PAY" === n ? r = "text-muted" : "TRADE_FINISHED" === n ? r = "" : "WAIT_BUYER_CONFIRM_GOODS" === n ? r = "warning" : "WAIT_SELLER_SEND_GOODS" === n ? r = "danger" : void 0
      }
    }, n.module("core").filter("tradeStyle", r)
  }, define(n, r)
}).call(this);
