const router = require('express').Router()
const auth = require('../middleware/auth')
const noteCtrl = require('../controllers/postCtrl')

router.route('/')
    .get(auth, noteCtrl.getPosts)
    .post(auth, noteCtrl.createPost)

router.route('/:id')
    .get(auth, noteCtrl.getNote)
    .put(auth, noteCtrl.updateNote)
    .delete(auth, noteCtrl.deleteNote)


module.exports = router