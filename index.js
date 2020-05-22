window.addEventListener("profileSwipeEvent", (e) => {
  const composedPath = e.composedPath();
  if (composedPath && composedPath.length > 0) {
    const elem = composedPath[0];
    elem.parentNode.removeChild(elem);
  }
});