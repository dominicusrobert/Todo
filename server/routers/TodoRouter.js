const express = require('express');

const TodoController = require ('../controllers/TodoController.js');
const AuthHelper = require('../helpers/AuthHelper.js');

const router = express.Router();

// CRUD Simple
router.post('/', AuthHelper.Authentication, TodoController.createTodo);
router.get('/id/:todo_id', AuthHelper.Authentication, TodoController.getTodo);
router.put('/id/:todo_id', AuthHelper.Authentication, TodoController.editTodo);
router.delete('/id/:todo_id', AuthHelper.Authentication, TodoController.deleteTodo);

// List
router.get('/list', AuthHelper.Authentication, TodoController.getUserTodoList);
router.get('/list/priority?', AuthHelper.Authentication, TodoController.getTodoListFromPriority);

// Mark
router.put('/id/:todo_id/markTodo', AuthHelper.Authentication, TodoController.markTodo);


module.exports = router;