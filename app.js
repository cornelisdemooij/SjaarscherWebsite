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
const path = window.location.pathname;
if (path === '/') {
  const sjaarscherInterest = getCookie('sjaarscher-interest');
  if (sjaarscherInterest === 'unions') {
    navigate('/unions');
  } else if (sjaarscherInterest === 'students') {
    navigate('/students');
  } else {
    navigate('/');
  }
} else {
  navigate(path);
}

function navigate(pathname) {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  rootDiv.innerHTML = routes[pathname]
}
function onNavigate(e) {
  console.log(e);
  if (e && e.detail) {
    navigate(e.detail);
  }
}
document.addEventListener("navigate", onNavigate);

window.onpopstate = () => {
  rootDiv.innerHTML = routes[window.location.pathname]
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function onOpenNav() {
  document.getElementById("side-navigation").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("overlay").style.display = "block";
}
document.addEventListener("openNav", onOpenNav);

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function onCloseNav() {
  document.getElementById("side-navigation").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("overlay").style.display = "none";
}
document.addEventListener("closeNav", onCloseNav);

function onFocusSearch() {
  const searchBox = document.getElementById("search-box");
  searchBox.focus();
}
document.addEventListener("focusSearch", onFocusSearch);

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}