const TodoModel = require('../models/TodoModel.js');
const AuthHelper = require('../helpers/AuthHelper.js');


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
            userId: response.locals.userId
        });

        todo.save(function (err, data) {
            if (err) {
                response.status(500).json({ message: 'Failed to save todo' });
                return;
            }

            response.json({
                message: 'Success create todo',
                data: data.responseModel()
            });
        });
    }


    static getTodo(request, response) {
        TodoModel.findById(request.params.todo_id)
            .exec()
            .then(todo => {
                
                if(!AuthHelper.Authorization(response, todo.userId)){
                    response.status(403).json({ message : 'Forbiden'})
                    return;
                }

                response.json({
                    message: 'Success get todo',
                    todo: todo.responseModel()
                });
            })
            .catch(err => {
                console.log(err);
                response.status(500).json({ message: 'Failed to get Todo' });
            });
    }

    static editTodo(request, response) {
        TodoModel.findById(request.params.todo_id)
            .exec()
            .then(todo => {

                if(!AuthHelper.Authorization(response, todo.userId)){
                    response.status(403).json({ message : 'Forbiden'})
                    return;
                }

                todo.name = request.body.name || todo.name;
                todo.priority_level = request.body.priority_level || todo.priority_level;
                todo.difficulty_level = request.body.difficulty_level || todo.difficulty_level;

                todo.save((err, newValue) => {
                    if (err) {
                        response.status(500).json({ message: 'Failed to edit Todo' });
                        return;
                    }

                    response.json({
                        message: 'Success edit todo',
                        data: newValue.responseModel()
                    });
                });
            })
            .catch(err => {
                response.status(500).json({ message: 'Failed to edit Todo' });
            });
    }

    static deleteTodo(request, response) {
        TodoModel.findById(request.params.todo_id)
            .exec()
            .then(todo => {
                if(!AuthHelper.Authorization(response, todo.userId)){
                    response.status(403).json({ message : 'Forbiden'})
                    return;
                }

                return TodoModel.findByIdAndRemove(request.params.todo_id).exec();
            })
            .then(todo => {
                response.json({
                    message: "Success delete todo",
                    id: todo._id
                });
            })
            .catch(err => {
                response.status(500).json({ message: 'Failed to detele Todo' });
            });

    }



    /**
     * List
     */

    static getUserTodoList(request, response) {
        TodoModel.find({ userId: response.locals.userId })
            .exec()
            .then(data => {
                let arrObj = [];

                data.forEach(function (item) {
                    arrObj.push(item.responseModel());
                });

                response.json({
                    message: 'Success get User Todo List',
                    data: arrObj
                });

            })
            .catch(err => {
                response.status(500).json({ message: 'Failed to get User Todo List' });
            });
    }

    static getTodoListFromPriority(request, response) {

        TodoModel.find({ userId: response.locals.userId, priority_level: request.query.level })
            .exec()
            .then(data => {
                let arrObj = [];

                data.forEach(function (item) {
                    arrObj.push(item.responseModel());
                });

                response.json({
                    message: 'Success get User Todo List (filtered by priority)',
                    data: arrObj
                });
            })
            .catch(err => {
                response.status(500).json({ message: 'Failed to get User Todo List (filtered by priority)' });
            });
    }



    /**
     * Mark
     */

    static markTodo(request, response) {
        TodoModel.findById(request.params.todo_id)
            .exec()
            .then(todo => {

                if(!AuthHelper.Authorization(response, todo.userId)){
                    response.status(403).json({ message : 'Forbiden'})
                    return;
                }

                todo.status = !todo.status;
                todo.save((err, newValue) => {
                    if (err) {
                        response.status(500).json({ message: 'Failed to Mark as Done' });
                        return;
                    }

                    response.json({
                        message: 'Success to Mark as Done',
                        data: newValue.responseModel()
                    });
                });
            })
            .catch(err => {
                response.status(500).json({ message: 'Failed to Mark as Done' });
            });
    }

}

module.exports = TodoController;