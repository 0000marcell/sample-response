import fs from 'fs-extra';
import request from 'request';

const sampleResponse = {
  /**
   * get sample response from end point 
   * @param request {Object} // request(lib) request object for a get
   * ex: { url: , headers {} }
  */
  getSampleResponse(requestData, filePath) {
    return new Promise((resolve, reject) => {
      request.get(requestData, 
        (error, response, body) => {
          if(error) {
            console.error('sample request failed with: ', error);
            reject();
            return;
          }

          if(typeof body === 'string')
            body = JSON.parse(body);

          let data = this.formatResponse(body);

          try {
            fs.writeFileSync(filePath, JSON.stringify(data));
            resolve('file written!');
          } catch(e) {
            console
              .error('Writing the sample request failed with: ', e);
            reject();
          }
      });  
    });
  },
  /**
   * transform the resquest data, leave only the first
   * element of arrays inside the request
   * @param data {Object} // data object
  */
  formatResponse(data) {
    let result;
    if(typeof data === 'object' && data.length) {
      result = [];
      result[0] = data[0];
      result[0] = this.formatResponse(result[0]);
    }

    if(typeof data === 'object' && !data.length) {
      result = {};
      Object.keys(data).forEach((key) => {
        result[key] = this.formatResponse(data[key]); 
      });
    }

    return result || data;
  }
}

export default sampleResponse;
