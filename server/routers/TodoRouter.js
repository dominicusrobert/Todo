const express = require('express');
const TodoController = require ('../controllers/TodoController.js');

const router = express.Router();

// CRUD Simple
router.post('/', TodoController.createTodo);
router.get('/:todo_id', TodoController.getTodo);
router.put('/:todo_id', TodoController.editTodo);
router.delete('/:todo_id', TodoController.deleteTodo);

// List
router.get('/list', TodoController.getUserTodoList);
router.get('/list/priority?', TodoController.getTodoListFromPriority);

// Mark
router.put('/:todo_id/done', TodoController.markAsDone);
router.put('/:todo_id/undone', TodoController.undoMarkAsDone);


module.exports = router;