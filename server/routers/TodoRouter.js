const express = require('express');

const TodoController = require ('../controllers/TodoController.js');
const AuthHelper = require('../helpers/AuthHelper.js');

const router = express.Router();

// CRUD Simple
router.post('/', AuthHelper.isAuthenticateAndAuthorized, TodoController.createTodo);
router.get('/id/:todo_id', AuthHelper.isAuthenticateAndAuthorized, TodoController.getTodo);
router.put('/id/:todo_id', AuthHelper.isAuthenticateAndAuthorized, TodoController.editTodo);
router.delete('/id/:todo_id', AuthHelper.isAuthenticateAndAuthorized, TodoController.deleteTodo);

// List
router.get('/list', AuthHelper.isAuthenticateAndAuthorized, TodoController.getUserTodoList);
router.get('/list/priority?', AuthHelper.isAuthenticateAndAuthorized, TodoController.getTodoListFromPriority);

// Mark
router.put('/id/:todo_id/done', AuthHelper.isAuthenticateAndAuthorized, TodoController.markAsDone);
router.put('/id/:todo_id/undone', AuthHelper.isAuthenticateAndAuthorized, TodoController.undoMarkAsDone);


module.exports = router;