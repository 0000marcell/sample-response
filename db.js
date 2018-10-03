var faker = require('faker');

module.exports = () => {
  let data = {
    users: []
  };

  for (var i = 0; i < 100; i++) {
    data.users.push({
      id: i,
      name: faker.name.findName(),
      products: []
    });

    for (var j = 0; j < 100; j++) {
      data.users[i].products.push({
        id: j,
        name: faker.commerce.productName()
      }); 
    }
  }

  return data;
}  
