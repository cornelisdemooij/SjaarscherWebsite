import { apiHost } from '../../config/config.js';
import XSRF from './XSRF.js';
    
class Groups {
  static create() {};
  
  static read() {
    XSRF.getXSRFToken()
      .then((xsrfToken) => {
        return fetch(`${apiHost}/api/group`, {
          headers: Headers({ 'xsrf-token' : xsrfToken })
        })
          .then(response => response.text())
          .then((data) => {
            const parsedData = data ? JSON.parse(data) : {};
            if (parsedData.status && parsedData.status !== 202) {
              throw parsedData;
            } else {
              return parsedData;
            }
          })
          .catch((error) => {
            console.error('Error: Could not get groups. Backend responded with: ' + JSON.stringify(error));
            return [];
          });
      })
      .catch((error) => {
        console.error('Error: Could not get an XSRF token to request groups. Backend responded with: ' + JSON.stringify(error));
        return [];
      });
  };

  static update() {};
  static delete() {};
}

export default Groups;