const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfige");

// Post answer
const post_answer = async (req, res) => {
  const { answer, userid, questionid } = req.body;
  // const questionid = req.params.questionid

  try {
    await dbConnection.query(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong, please try again later" });
  }
};

// Get all answers for a question
const all_answer = async (req, res) => {
  const questionid = req.params.questionid;

  try {
    const answers = await dbConnection.query(
      "SELECT a.answerid, a.answer, u.username FROM answers a JOIN users u ON a.userid = u.userid WHERE questionid = ? ORDER BY answerid DESC;",
      [questionid]
    );

    return res.status(StatusCodes.OK).json( answers[0] );
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = { post_answer, all_answer };
