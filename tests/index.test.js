import sampleResponse from '../dist/index';
import path from 'path';
import fs from 'fs-extra';

const filePath = `${__dirname}/result.txt`;

beforeEach(() => {
  fs.removeSync(filePath); 
});

test('#index-test-1', async function() {
  let request = {
    url: 'http://localhost:3000/posts'
  };

  console.log('sampleResponse: ', sampleResponse);

  let data = await sampleResponse.getSampleResponse(request, filePath);

  let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  expect(fileData).toBe({ id: "testing" });
});
