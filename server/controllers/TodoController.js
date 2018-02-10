const jwt = require('jsonwebtoken');

const TodoModel = require('../models/TodoModel.js');

class TodoController {

    /**
     * CRUD Simple
     */

    static createTodo(request, response) {
        var todo = new TodoModel({
            name: request.body.name,
            priority_level: request.body.priority_level,
            difficulty_level: request.body.difficulty_level,
            // deadline: request.body.deadline,
            status: false,
            userId: request.body.user_id
        });

        todo.save(function (err, data) {
            if (err) {
                response.status(500).json('Can not save todo');
                return;
            }

            response.json('Success create todo');
        });
    }


    static getTodo(request, response) {
        TodoModel.findById(request.params.todo_id)
            .exec()
            .then(data => {

                let obj = {
                    todo_id: data.id,
                    todo_name: data.name,
                    priority_level: data.priority_level,
                    difficulty_level: data.difficulty_level,
                    status: data.status
                };

                response.json(obj);
            })
            .catch(err => {
                response.status(500).json('Something error');
            });
    }

    static editTodo(request, response) {
        TodoModel.findById(request.params.todo_id)
            .exec()
            .then(todo => {
                todo.name = request.body.name || todo.name;
                todo.priority_level = request.body.priority_level || todo.priority_level;
                todo.difficulty_level = request.body.difficulty_level || todo.difficulty_level;

                todo.save((err, newValue) => {
                    if (err) {
                        response.status(500).json(err);
                        return;
                    }
                    response.json(newValue);
                });
            })
            .catch(err => {
                response.status(401).json('Invalid email');
            });
    }

    static deleteTodo(request, response) {
        TodoModel.findByIdAndRemove(request.params.todo_id, function (err, todo) { 
            let message = {
                message : "Todo successfully deleted",
                id: todo._id
            };

            response.send(message);
        });
    }



    /**
     * List
     */

    static getUserTodoList(request, response) {
        jwt.verify(request.headers.jwt, process.env.SECRET_KEY, function (err, decoded) {

            TodoModel.find({ userId: decoded.id })
                .exec()
                .then(data => {
                    let arrObj = [];

                    data.forEach(function (item) {
                        arrObj.push({
                            todo_id: item.id,
                            todo_name: item.name,
                            priority_level: item.priority_level,
                            difficulty_level: item.difficulty_level,
                            status: item.status
                        });
                    });

                    response.json(arrObj);
                })
                .catch(err => {
                    response.status(500).json('Something error');
                });
        });

    }

    static getTodoListFromPriority(request, response) {
        
        jwt.verify(request.headers.jwt, process.env.SECRET_KEY, function (err, decoded) {

            TodoModel.find({ userId: decoded.id, priority_level : request.query.level })
                .exec()
                .then(data => {
                    let arrObj = [];

                    data.forEach(function (item) {
                        arrObj.push({
                            todo_id: item.id,
                            todo_name: item.name,
                            priority_level: item.priority_level,
                            difficulty_level: item.difficulty_level,
                            status: item.status
                        });
                    });

                    response.json(arrObj);
                })
                .catch(err => {
                    response.status(500).json('Something error');
                });
        });
    }



    /**
     * Mark
     */

    static markAsDone(request, response) {
        TodoModel.findById(request.params.todo_id)
        .exec()
        .then(todo => {
            todo.status = true;

            todo.save((err, newValue) => {
                if (err) {
                    response.status(500).json(err);
                    return;
                }
                response.json(newValue);
            });
        })
        .catch(err => {
            response.status(401).json('Invalid email');
        });
    }

    static undoMarkAsDone(request, response) {
        TodoModel.findById(request.params.todo_id)
        .exec()
        .then(todo => {
            todo.status = false;

            todo.save((err, newValue) => {
                if (err) {
                    response.status(500).json(err);
                    return;
                }
                response.json(newValue);
            });
        })
        .catch(err => {
            response.status(401).json('Invalid email');
        });
    }
}

module.exports = TodoController;