const { predict } = require('./handler');

const routes = [
  {
      method: 'POST',
      path: '/predict',
      handler: predict,
      options: {
          payload: {
              allow: 'multipart/form-data',
              multipart: true,
              output: 'stream',
              maxBytes: 1048576,
          },
      },
  }
  ];
   
module.exports = routes;