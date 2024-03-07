const express = require('express');
const router = express.Router();
const { postQuestions, allQuestions, singleQuestions } = require('../controller/questionController');

// Routes for questions
router.post("/post-question", postQuestions);
router.get("/all-questions",  allQuestions);
router.get("/question/:questionid", singleQuestions);

module.exports = router;
