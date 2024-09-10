export function isWeChat() {
  var ua = navigator.userAgent.toLowerCase();
  var isWXWork = ua.match(/wxwork/i);
  var isWeixin = !isWXWork && ua.match(/MicroMessenger/i);

  return isWeixin;
}
