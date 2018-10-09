# Sample Response

creates a fake json server based on a request of a existing API

# motive
sometimes you just want to understand the return of a API and you don't care about much of the details
you also wanna make something visual with the result of the api and just want to quickly mock a fake server
this is the package for you :D

get-sample-response ./config.js

```
config.js:
{
  endPoints: [
    {
      url: 'http://<my-end-point>/users', // url of the api that you want to create the mock
      headers: , // optional headers if you need to pass aditional information
      mapTo: 'users' // name of the url of your fake server
    },
    {
      url: 'http://<my-end-point>/products', // url of the api that you want to create the mock
      headers: , // optional headers if you need to pass aditional information
      mapTo: 'products' // name of the url of your fake server
    }
  ]
}
```
