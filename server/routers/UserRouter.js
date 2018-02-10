const express = require('express');
const UserController = require ('../controllers/UserController.js');

const router = express.Router();


// CRUD Simple
router.post('/', UserController.createOrGetUser);
router.put('/', UserController.editUser);
router.delete('/', UserController.deleteUser);


module.exports = router;