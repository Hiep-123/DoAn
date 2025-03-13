const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

router.post('/', commentController.addComment)
router.get('/', commentController.getComments)
router.delete('/:id', commentController.deleteCommentId)

module.exports = router