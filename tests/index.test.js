const sampleResponse = require('../dist/index');
const path = require('path');
const fs = require('fs-extra');

const filePath = `${__dirname}/result.txt`;

beforeEach(() => {
  fs.removeSync(filePath); 
});

test('#index-test-1', async function() {
  let request = {
    url: 'http://localhost:3000/posts'
  };

  let data = await sampleResponse.default.getSampleResponse(request, filePath);

  let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  expect(fileData).toBe({ id: "testing" });
});
