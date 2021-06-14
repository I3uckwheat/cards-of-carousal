export default function requestFullscreen() {
  const docEl = document.documentElement;
  const noop = () => {};
  const requestFullscreenPrefix =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen ||
    noop;

  return requestFullscreenPrefix.call(docEl);
}
