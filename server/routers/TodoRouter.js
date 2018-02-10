const express = require('express');
const TodoController = require ('../controllers/TodoController.js');

const router = express.Router();

// CRUD Simple
router.post('/', TodoController.createTodo);
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.editTodo);
router.delete('/:id', TodoController.deleteTodo);

// List
router.get('/list', TodoController.getTodoList);
router.get('/list/priority?', TodoController.getTodoListFromPriority);

// Mark
router.get('/:id/done', TodoController.markAsDone);
router.get('/:id/undone', TodoController.undoMarkAsDone);


module.exports = router;