import fs from 'fs-extra';
import request from 'request';
import JSON5 from 'json5';

const sampleResponse = {
  /**
   * main function, loads the configuration file, get sample data, format it
   * and write a compatible json-server db.json file
   * @param config file path {String} // path to the configuration file 
  */
  async init(path, filePath) {
    filePath = filePath || './db.js';
    let config = this.loadConfig(path);
    let resultObj = {};
    for(const item of config.endPoints) {
      let data = await this.getSampleResponse(item.url);
      resultObj[item.mapTo] = data;
    }
    fs.writeFileSync(filePath, JSON.stringify(resultObj));
    console.log(`json-server db created at ${filePath}`);
  },
  /**
   * load the configuration file
   * @param file path {String} // path to the configuration file 
  */
  loadConfig(path) {
    let fileData = fs.readFileSync(path, 'utf-8');
    return JSON5.parse(fileData);
  },
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
            //fs.writeFileSync(filePath, JSON.stringify(data));
            resolve(data);
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
    if(!data) return data;
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
