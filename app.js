const routes = {
  '/': `<home-page></home-page>`,
  '/home': `<home-page></home-page>`,
  '/unions': `<unions-page></unions-page>`,
  '/students': `<students-page></students-page>`,
  '/chat': `chat`,
  '/events': `events`,
  '/account': `account`,
  '/settings': `settings`,
  '/about': `about`
};

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

function onNavigate(pathname) {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  rootDiv.innerHTML = routes[pathname]
}

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname]
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("side-navigation").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("overlay").style.display = "block";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("side-navigation").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("overlay").style.display = "none";
}

function focusSearch() {
  console.log("in focusSearch()")
  const searchBox = document.getElementById("search-box");
  searchBox.focus();
}
function unfocusSearch() {
  console.log("in unfocusSearch()")
  const searchBox = document.getElementById("search-box");
  searchBox.blur();
}
