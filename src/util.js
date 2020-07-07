import { apiHost } from '../config/config.js';
import XSRF from '../src/services/XSRF.js';

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

  XSRF.getXSRFToken()
    .then(xsrfToken => fetch(`${apiHost}/api/email`, {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': xsrfToken
      }),
      body: JSON.stringify(message)
    }))
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
}

function dispatchEmailSubmitResult(success, caller) {
  const event = new CustomEvent('emailSubmitResult', { 
    detail: { success },
    bubbles: true,
    composed: true,
  });
  caller.dispatchEvent(event);
}

export function formatPhoneNumber(rawPhoneNumber) {
  if (typeof rawPhoneNumber !== 'string' || rawPhoneNumber.length !== 10) {
    return rawPhoneNumber;
  }
  else if (rawPhoneNumber.slice(0,2) === '06') {
    return `(06) ${rawPhoneNumber.slice(2,4)} ${rawPhoneNumber.slice(4,6)} ${rawPhoneNumber.slice(6,8)} ${rawPhoneNumber.slice(8,10)}`;
  }
  else {
    return `(${rawPhoneNumber.slice(0,3)}) ${rawPhoneNumber.slice(3,6)} ${rawPhoneNumber.slice(6,8)} ${rawPhoneNumber.slice(8,10)}`;
  }
}