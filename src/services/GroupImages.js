import { apiHost } from '../../config/config.js';
    
class GroupImages {
  static create() {};
  
  static read() {
    return fetch(`${apiHost}/api/groupimage`)
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
        console.error('Error: Could not get group images. Backend responded with: ' + JSON.stringify(error));
        return [];
      });
  };
  static readByGroupId(groupId) {
    if (groupId) {
      return fetch(`${apiHost}/api/groupimage?groupId=${groupId}`)
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
        console.error('Error: Could not get group images by group id. Backend responded with: ' + JSON.stringify(error));
        return [];
      });
    } else {
      console.error('Error: Could not get group images by group id, as no group id was specified.');
      return Promise.resolve([]);
    }
  }

  static update() {};
  static delete() {};
}

export default GroupImages;