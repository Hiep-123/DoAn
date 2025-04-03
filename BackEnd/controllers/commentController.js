const { Comment, User } = require('../model/model')

const commentController = {
    addComment: async (req, res) => {
        try {
            let { ratingPoints, comment, userId, bookingId } = req.body;

            // Tạo mới comment và liên kết với userId
            const newComment = new Comment({
                ratingPoints,
                comment,
                userId,
                bookingId
            });

            await newComment.save();

            res.status(201).json({ message: 'Comment added successfully!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getComments: async (req, res) => {
        try {
            const findComment = await Comment.find()
            res.status(200).json(findComment)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteCommentId: async (req, res) => {
        try {
            const deleteComment = await Comment.findByIdAndDelete(req.params.id)
            if (!deleteComment) {
                return res.status(404).send()
            }
            req.status(200).send("Delete Comment Successfully !")
        } catch (error) {
            req.status(500).json(error)
        }
    }
}

module.exports = commentController 