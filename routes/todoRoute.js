const Models = require('../models/index')
const joi = require('@hapi/joi');
const todosHandler = async (request, h) => {
    try {
        console.log("ambil data")
        const todos = await Models.Todos.findAll({})
        return { data: todos }
    }catch(error){
        return h.response({ error: error.message }).code(400)
    }
}

const createTodoHandler = async (request, h) => {
    try{
        const{ titleReq, descriptionReq, userIdReq, completedReq } = request.payload;
        console.log(request.payload);
        const todo = await Models.Todos.create({
            title: titleReq,
            description: descriptionReq,
            userId: userIdReq,
            completed : completedReq,
        })
        return {
            data : todo,
            message: 'New todo has been created'
        }
    }catch(error){
        return h.response({
            error: error.message
        }).code(400)
    }
}

const updateTodoHendler = async (request, h) => {
    try{
        const todo_id = request.params.id;
        const {titleReq, descriptionReq,completedReq} = request.payload;
        const todo = await Models.Todo.update({
            title: titleReq,
            description: descriptionReq,
            completedReq: completedReq,
        }, {
            where: {
                id: todo_id
            }
        })

        const dataRequest = request.payload
        console.log('dataRequest');
        console.log(todo);
        return{
            data: dataRequest,
            message: 'Todo has been update'
        }
    }catch(error){
        return h.response({
            error: error.message
        }).code(400)
    }
}

const deleteTodoHandler = async (request, h) => {
    try{
        const todo_id = request.params.id;
        await Models.Todo.destroy({
            where: {
                id: todo_id
            }
        })
        return { message: 'Todo has Been deleted'}
    }catch(error){
        return h.response({
            error: error.message
        }).code(400)
    }
}

module.exports = [
    { method: 'GET', path: '/todo', handler: todosHandler},
    { 
        method: 'POST',
        path: '/todo',
        config: {
            validate: {
                payload: {
                    titleReq: joi.string().min(1).required(),
                    descriptionReq: joi.string().min(1).required(),
                    userIdReq: joi.number().min(1).required(),
                    completedReq: joi.string().required()
                }
            }
        },
        handler: createTodoHandler,

    },
    { method: 'PUT', path: '/todo/{id}', handler: updateTodoHendler},
    { method: 'DELETE', path: '/todo/{id}', handler: deleteTodoHandler}
];