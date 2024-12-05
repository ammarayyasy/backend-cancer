const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: '0.0.0.0', // Mendengarkan koneksi dari semua IP
    });    

    server.ext('onRequest', (request, h) => {
        request.mime = request.headers['content-type'] || 'application/json';
        return h.continue;
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
