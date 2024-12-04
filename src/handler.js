const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Boom = require('@hapi/boom');

const predict = async (request, h) => {
    try {
        const { image } = request.payload;

        if (!image) {
            throw Boom.badRequest('File tidak ditemukan.');
        }

        if (image._data.length > 1000000) {
            return h
                .response({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000',
                })
                .code(413);
        }

        const isCancerDetected = Math.random() < 0.5;

        const response = {
            status: 'success',
            message: 'Model is predicted successfully',
            data: {
                id: uuidv4(),
                result: isCancerDetected ? 'Cancer' : 'Non-cancer',
                suggestion: isCancerDetected
                    ? 'Segera periksa ke dokter!'
                    : 'Penyakit kanker tidak terdeteksi.',
                createdAt: moment().toISOString(),
            },
        };

        return h.response(response).code(201);
    } catch (error) {
        if (Boom.isBoom(error)) {
            return error;
        }

        return h
            .response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            })
            .code(400);
    }
};

module.exports = { predict };
