export default function requestFullscreen() {
  const docEl = document.documentElement;
  const requestFullscreenPrefix =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;

  return requestFullscreenPrefix.call(docEl);
}
