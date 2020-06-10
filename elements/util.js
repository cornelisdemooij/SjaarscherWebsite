export function getCookie(cname) {
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

export function submitEmail(email) {
  const message = { email };

  // TODO: Add config for domain by environment (local or prod).

  //return fetch('http://localhost:8080/api/xsrf', { credentials: 'include' }).then(response => {
  fetch('https://sjaarscher.nl/api/xsrf', { credentials: 'include' }).then(response => {
    if (!response) {
      window.alert('Error: invalid XSRF response from backend API.');
      return false;
    }

    const xsrfToken = getCookie('XSRF-TOKEN');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrfToken
    });
    if (!xsrfToken) {
      window.alert('Error: XSRF-TOKEN cookie not found.');
      return false;
    }
    
    //return fetch('http://localhost:8080/api/email', {
    fetch('https://sjaarscher.nl/api/email', {
      method: 'post',
      credentials: 'include',
      headers,
      body: JSON.stringify(message)
    })
    .then(response => response.text())
    .then((data) => {
      const parsedData = data ? JSON.parse(data) : {};
      if (parsedData.status && parsedData.status !== 202) {
        throw parsedData;
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.error(error)
      window.alert('Error: Could not save e-mail address. Backend responded with: ' + JSON.stringify(error));
      return false;
    });
  });
}