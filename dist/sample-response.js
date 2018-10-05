'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _json = require('json5');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sampleResponse = {
  /**
   * main function, loads the configuration file, get sample data, format it
   * and write a compatible json-server db.json file
   * @param config file path {String} // path to the configuration file 
  */
  init: async function init(path, filePath) {
    filePath = filePath || './db.js';
    var config = this.loadConfig(path);
    var resultObj = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = config.endPoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        console.log('inside loop!');
        var data = await this.getSampleResponse(item.url);
        resultObj[item.mapTo] = data;
        console.log('returned data: ', data);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    console.log('gonna write: ', resultObj);
    _fsExtra2.default.writeFileSync(filePath, JSON.stringify(resultObj));
    console.log('json-server db created at ' + filePath);
  },

  /**
   * load the configuration file
   * @param file path {String} // path to the configuration file 
  */
  loadConfig: function loadConfig(path) {
    var fileData = _fsExtra2.default.readFileSync(path, 'utf-8');
    return _json2.default.parse(fileData);
  },

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

        if (typeof body === 'string') body = JSON.parse(body);

        var data = _this.formatResponse(body);

        try {
          //fs.writeFileSync(filePath, JSON.stringify(data));
          resolve(data);
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

    if (!data) return data;
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