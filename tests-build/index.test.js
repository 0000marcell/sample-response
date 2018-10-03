'use strict';

var sampleResponse = require('../dist/index');
var path = require('path');
var fs = require('fs-extra');

var filePath = __dirname + '/result.txt';

beforeEach(function () {
  fs.removeSync(filePath);
});

test('#index-test-1', async function () {
  var request = {
    url: 'http://localhost:3000/posts'
  };

  var data = await sampleResponse.default.getSampleResponse(request, filePath);

  var fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  expect(fileData).toBe({ id: "testing" });
});