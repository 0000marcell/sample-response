const sampleResponse = require('../dist/index');
const path = require('path');
const fs = require('fs');

const filePath = `${__dirname}/result.txt`;

beforeEach(() => {
  fs.removeSync(filePath); 
});

test('#index-test-1', function() {
  let request = {
    url: 'http://localhost:3000/posts'
  };

  return sampleResponse.default.getSampleResponse(request, filePath)
    .then(function(data) {
    let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(fileData).toBe({ id: "testing" });
  }); 
});
