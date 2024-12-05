const { predict } = require('./handler');

const routes = [
    {
        method: 'GET', // Method GET untuk route /
        path: '/',
        handler: (request, h) => {
            return 'Welcome'; // Mengembalikan teks "Welcome"
        },
    },
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
    },
];

module.exports = routes;
