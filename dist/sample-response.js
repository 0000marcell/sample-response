'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    var _this = this;

    return new Promise(function (resolve, reject) {
      _request2.default.get(requestData, function (error, response, body) {
        if (error) {
          console.error('sample request failed with: ', error);
          reject();
          return;
        }

        var data = _this.formatResponse(body);

        console.log('%s', data);

        try {
          _fsExtra2.default.writeFileSync(filePath, data);
          resolve('file written');
        } catch (e) {
          console.error('Writing the sample request failed with: ', e);
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
  formatResponse: function formatResponse(data) {
    var _this2 = this;

    var result = void 0;
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data.length) {
      result = [];
      result[0] = data[0];
      result[0] = this.formatResponse(result[0]);
    }

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && !data.length) {
      result = {};
      Object.keys(data).forEach(function (key) {
        result[key] = _this2.formatResponse(data[key]);
      });
    }

    return result || data;
  }
};

exports.default = sampleResponse;