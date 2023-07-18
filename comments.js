// Create web server with express
// Date: 2021/01/25
// Creator: NhatHoang

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// @route POST api/comment
// @desc Create a comment
// @access Private
router.post('/', async (req, res) => {
    try {
        const { content, postId } = req.body;

        const newComment = new Comment({
            content,
            postId,
            userId: req.user.id,
        });

        const comment = await newComment.save();
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route GET api/comment
// @desc Get all comments
// @access Private
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route GET api/comment/:postId
// @desc Get all comments of a post
// @access Private
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route DELETE api/comment/:id
// @desc Delete a comment
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        // Check user
        if (comment.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await comment.remove();

        res.json({ msg: 'Comment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;


