'use strict';

var _index = require('../dist/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filePath = __dirname + '/result.txt';

beforeEach(function () {
  _fsExtra2.default.removeSync(filePath);
});

test('#index-test-1', async function () {
  var request = {
    url: 'http://localhost:3000/posts'
  };

  console.log('sampleResponse: ', _index2.default);

  var data = await _index2.default.getSampleResponse(request, filePath);

  var fileData = JSON.parse(_fsExtra2.default.readFileSync(filePath, 'utf-8'));

  expect(fileData).toBe({ id: "testing" });
});