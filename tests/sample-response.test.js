import sampleResponse from '../dist/sample-response';
import path from 'path';
import fs from 'fs-extra';

const filePath = `${__dirname}/result.txt`;

beforeEach(() => {
  fs.removeSync(filePath); 
});

test('#sampleResponse-test-1', async function() {
  let request = {
    url: 'http://localhost:3000/users'
  };

  console.log('sampleResponse: ', sampleResponse);

  let data = await sampleResponse.getSampleResponse(request, filePath);

  let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  expect(fileData).toBe({ id: "testing" });
});

test('#sampleResponse-test-2', function() {
  let inputData = [{ items: [{ items: [1, 2] }, { items: [1, 2] }]},
    { items: [{ items: [1, 2] }, { items: [1, 2] }]}]; 

  let outputData = [{ items: [{ items: [1]}]}];

  let result = sampleResponse.formatResponse(inputData); 
  expect(result).toEqual(outputData);
});

test('#sampleResponse-test-3', function() {
  let inputData = {
    users: [
      {
        id: 1,
        name: 'name',
        products: [
          {
            id: 1,
            name: 'other-name'
          },
          {
            id: 2,
            name: 'other-name'
          }
        ]
      },
      {
        id: 2,
        name: 'name-2',
        products: [
          {
            id: 2,
            name: 'other-name2'
          },
          {
            id: 3,
            name: 'other-name3'
          }
        ]
      }
    ]
  };

  let outputData = {
    users: [
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
    ]
  };
  let result = sampleResponse.formatResponse(inputData); 
  expect(result).toBe(outputData);
});
