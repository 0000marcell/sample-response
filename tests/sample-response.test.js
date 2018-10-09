import sampleResponse from '../dist/sample-response';
import path from 'path';
import fs from 'fs-extra';
import dbData from '../db-data';

const filePath = `${__dirname}/result.txt`;
const resultDbPath = `${__dirname}/test-db.js`;

beforeEach(() => {
  fs.removeSync(filePath); 
  fs.removeSync(resultDbPath); 
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

let url = 'http://localhost:3000/users';

test('#sampleResponse-test-1', async function() {
  let request = {
    url: url
  };

  let data = await sampleResponse.getSampleResponse(request, filePath);

  expect(data).toEqual(outputData);
});

test('#sampleResponse-test-2', function() {
  let inputData = [{ items: [{ items: [1, 2] }, { items: [1, 2] }]},
    { items: [{ items: [1, 2] }, { items: [1, 2] }]}]; 

  let outputData = [{ items: [{ items: [1]}]}];

  let result = sampleResponse.formatResponse(inputData); 
  expect(result).toEqual(outputData);
});

test('formatResponse array #sampleResponse-test-3', function() {
  let result = sampleResponse.formatResponse(dbData.users); 
  expect(result).toEqual(outputData);
});

test('formatResponse object #sampleResponse-test-4', function() {
  let sampleData = {
    users: {
      name: 'just a name',
      values: [1, 2, 4],
      types: [1, 2, 3]
    },
    posts: {
    }
  };

  let outputData = {
    users: {
      name: 'just a name',
      values: [1],
      types: [1]
    },
    posts: {
    }
  };
  let result = sampleResponse.formatResponse(sampleData); 
  expect(result).toEqual(outputData);
});

test('formatResponse with null value #sampleResponse-test-5', function() {
  let sampleData = {
    users: {
      name: null,
      values: [1, 2, 4],
      types: [1, 2, 3]
    },
    posts: {
    }
  };

  let outputData = {
    users: {
      name: null,
      values: [1],
      types: [1]
    },
    posts: {
    }
  };
  let result = sampleResponse.formatResponse(sampleData); 
  expect(result).toEqual(outputData);
});

test('Load data from a configuration file #sampleResponse-test-6', function() {
  let output = {
    endPoints: [
      {
        url: 'http://localhost:3000/users',
        mapTo: 'people'
      },
      {
        url: 'http://localhost:3000/products', 
        mapTo: 'items' 
      }
    ]
  };

  let result = sampleResponse.loadConfig(`${__dirname}/config.js`); 
  expect(result).toEqual(output);
});

test('create a valid json-server db.json based on file configuration #sampleResponse-test-7', 
  async function() {
  
  let people = dbData['users'][0]; 
  people.products = [people.products[0]]
  let resultDB = {
    people: [people],
    items: [dbData['products'][0]]
  };

  await sampleResponse.init(`${__dirname}/config.js`, resultDbPath); 
  let fileData = fs.readFileSync(resultDbPath, 'utf-8');
  expect(JSON.parse(fileData)).toEqual(resultDB);
});
