window.addEventListener("profileSwipeEvent", (e) => {
  const composedPath = e.composedPath();
  if (composedPath && composedPath.length > 0) {
    const elem = composedPath[0];
    elem.parentNode.removeChild(elem);
  }
});

/* Set the width of the side navigation to 250px */
export function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}