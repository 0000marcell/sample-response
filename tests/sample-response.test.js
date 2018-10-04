import sampleResponse from '../dist/sample-response';
import path from 'path';
import fs from 'fs-extra';
import dbData from '../db-data';

const filePath = `${__dirname}/result.txt`;

beforeEach(() => {
  fs.removeSync(filePath); 
});

const outputData = [
  {
    id: 1,
    name: 'name',
    products: [
      {
        id: 1,
        name: 'other-name'
      }
    ]
  }
];

test('#sampleResponse-test-1', async function() {
  let request = {
    url: 'http://localhost:3000/users'
  };

  let data = await sampleResponse.getSampleResponse(request, filePath);

  let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  expect(fileData).toEqual(outputData);
});

test('#sampleResponse-test-2', function() {
  let inputData = [{ items: [{ items: [1, 2] }, { items: [1, 2] }]},
    { items: [{ items: [1, 2] }, { items: [1, 2] }]}]; 

  let outputData = [{ items: [{ items: [1]}]}];

  let result = sampleResponse.formatResponse(inputData); 
  expect(result).toEqual(outputData);
});

test('#sampleResponse-test-3', function() {
  let result = sampleResponse.formatResponse(dbData.users); 
  expect(result).toEqual(outputData);
});
