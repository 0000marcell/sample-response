'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleResponse = {
  /**
   * get sample response from end point 
   * @param request {Object} // request(lib) request object for a get
   * ex: { url: , headers {} }
  */
  getSampleResponse: function getSampleResponse(requestData, filePath) {
    return new Promise(function (resolve, reject) {
      _request2.default.get(requestData, function (error, response, body) {
        if (error) {
          console.error('sample request failed with: ', error);
          reject();
          return;
        }

        try {
          _fsExtra2.default.writeFileSync(filePath, body);
          resolve('file written');
        } catch (e) {
          console.error('Writing the sample request failed with: ', e);
          reject();
        }
      });
    });
  },
  testAsync: function testAsync() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('file written');
      }, 1000);
    });
  }
};

exports.default = sampleResponse;