import { apiHost } from '../../config/config.js';

class XSRF {
  static getXSRFToken() {
    const xsrfToken = getCookie('XSRF-TOKEN');
    if (xsrfToken) {
      return Promise.resolve(xsrfToken);
    } else {
      return fetch(`${apiHost}/api/xsrf`, { credentials: 'include' })
        .then(response => {
          if (!response) {
            console.error('Error: invalid XSRF response from backend API.');
          }
      
          const xsrfToken = getCookie('XSRF-TOKEN');
          if (!xsrfToken) {
            console.error('Error: XSRF-TOKEN cookie not found.');
            throw 'Error: XSRF-TOKEN cookie not found.';
          } else {
            return xsrfToken;
          }
        });
    }
  };
}

export default XSRF;