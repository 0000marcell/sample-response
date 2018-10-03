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
          
          try {
            fs.writeFileSync(filePath, body);
            resolve('file written');
          } catch(e) {
            console
              .error('Writing the sample request failed with: ', e);
            reject();
          }
      });  
    });
  },
  testAsync() {
    return new Promise(function (resolve) {
      setTimeout(function(){
        resolve('file written');
      }, 1000)  
    });
  }
}

export default sampleResponse;
