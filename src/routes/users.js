'use strict';
const joi = require('@hapi/joi');

exports.plugin = {
    pkg: require('../../package.json'),
    name: 'route-books',
    register: async (server,option, next) => {
        const basePath = '/api/v1/';
        server.route([
            {
                method: 'GET',
                path: basePath + 'users',
                handler: (request, h) => {
                    const data = 
                    { data: 'hello from users' }
                    return h.response(data).code(200)
                }
            },
            {
                method: 'GET',
                path: basePath + 'users/{id}',
                options:{
                    validate : {
                        params:{
                            id: joi.number().required().min(1),
                        },
                        query: {
                            page: joi.number().min(0).dafault(1),
                        }   
                    }
                },
                handler: (request, h) => {
                    return 'Hello from user ' + request.params.id + ' Parameter Page = ' + require.query.page;
                }
            }
        ]);
    }
};
