import { apiHost } from '../config/config.js';

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

export function submitEmail(email, caller) {
  const message = { email };

  // TODO: Add config for domain by environment (local or prod).

  fetch(`${apiHost}/api/xsrf`, { credentials: 'include' }).then(response => {
    if (!response) {
      window.alert('Error: invalid XSRF response from backend API.');
      dispatchEmailSubmitResult(false, caller);
    }

    const xsrfToken = getCookie('XSRF-TOKEN');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': xsrfToken
    });
    if (!xsrfToken) {
      window.alert('Error: XSRF-TOKEN cookie not found.');
      dispatchEmailSubmitResult(false, caller);
    }
    
    fetch(`${apiHost}/api/email`, {
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
        dispatchEmailSubmitResult(true, caller);
      }
    })
    .catch((error) => {
      console.error(error)
      window.alert('Error: Could not save e-mail address. Backend responded with: ' + JSON.stringify(error));
      dispatchEmailSubmitResult(false, caller);
    });
  });
}

function dispatchEmailSubmitResult(success, caller) {
  const event = new CustomEvent('emailSubmitResult', { 
    detail: { success },
    bubbles: true,
    composed: true,
  });
  caller.dispatchEvent(event);
}