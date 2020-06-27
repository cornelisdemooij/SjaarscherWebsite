import { apiHost } from '../../config/config.js';
    
class Groups {
  static create() {};
  
  static read() {
    return fetch(`${apiHost}/api/group`)
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
  };

  static update() {};
  static delete() {};
}

export default Groups;