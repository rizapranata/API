/**
 * index.js
 */

const Hapi = require('@hapi/hapi');
const joi = require('@hapi/joi');
const server = new Hapi.Server({
    host: 'localhost',
    port: 3101,
});

server.route([
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'i am root route';
        },
    },
    {
        method: 'GET',
        path:'/hello',
        handler: (request, h) => {
            return 'hello';
        },
    },
    {
        method: 'POST',
        path: '/persegi',
        config: {
            validate: {
                payload: {
                    panjang: joi.number().min(1).required(),
                    lebar: joi.number().min(1).required()
                }
            }
        },
        handler: (request, h) => {
            console.log(request.payload); //cek parameter inputan form
            let panjangRequest = request.payload.panjang; //konversi string ke number
            let lebarRequest = request.payload.lebar;
            let hasil = parseInt(panjangRequest) * parseInt(lebarRequest); //bikin variable penampung luas
            const data = { data: 'rumus persegi',...request.payload,hasil: hasil }//bikin respon berbentuk JSON
            return h.response(data).code(200) //return out pun berupa json
        }
    },
    {
        method: 'POST',
        path: '/ganjilGenap',
        config: {
            validate:{
                payload: {
                    angka: joi.number().min(1).required(),
                }
            }
        },
        handler:(request, h) => {
            console.log(request.payload);
            let angkaRequest = request.payload.angka;
            let hasil = parseInt(angkaRequest);
            
            let data = {data : 'Data Paa'}
            console.log(hasil)
            if(hasil % 2 == 0){
                console.log('genap')
                  data = { data: 'Data Genap',...request.payload,hasil: hasil}
            }else{
                console.log('ganjil')
                  data = { data: 'Data Ganjil',...request.payload,hasil: hasil}
            }
            return h.response(data).code(200)
        }
    }
]);

const main = async () => {
  //  await server.register(require('./src/routes/users'));
    await server.start()
    return server
};

main().then(server => {
    console.log('Server running at:', server.info.uri)
}).catch(err => {
    console.log(err)
    process.exit(1)
})