const express = require('express');

const UserController = require ('../controllers/UserController.js');
const AuthHelper = require('../helpers/AuthHelper.js');

const router = express.Router();


// CRUD Simple
router.post('/', UserController.createOrGetUser);
router.put('/', AuthHelper.isAuthenticateAndAuthorized, UserController.editUser);
router.delete('/', AuthHelper.isAuthenticateAndAuthorized, UserController.deleteUser);


module.exports = router;