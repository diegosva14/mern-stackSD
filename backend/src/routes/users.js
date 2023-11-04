const { Router } = require('express');
const router = Router();
const {getUsers, createUser, deleteUser, editUser,getUser} = require('../controllers/users.controller');
router.route('/')
    .get(getUsers)
    .post(createUser)
router.route('/:id')
    .delete(deleteUser)
    .put(editUser)
    .get(getUser)
module.exports = router;

