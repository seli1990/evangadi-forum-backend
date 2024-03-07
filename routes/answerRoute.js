// const { StatusCodes } = require("http-status-codes");
// const dbConnection = require("../db/dbConfig");


const express = require("express");
const router = express.Router();
const { post_answer, all_answer } = require("../controller/answerController");

// Route to post an answer
router.post("/:questionid", post_answer);

// Route to get all answers for a question
router.get("/allanswer/:questionid" ,all_answer);

module.exports = router;
