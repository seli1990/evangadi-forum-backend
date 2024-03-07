const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfige");
const { v4: uuidv4 } = require('uuid');

//post questions function
async function postQuestions(req, res) {
  // const userid = req.user.userid;
  // const questionid = uuidv4();
  req.body.questionid = uuidv4();
  const { questionid ,userid, title, description, tag } = req.body;
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all questions properties" });
  }
  
  try {
    await dbConnection.query(
      "INSERT INTO questions(questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag]
    );
    return res.status(StatusCodes.CREATED).json({
      msg: "Question posted successfully. Redirecting to home page.",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" }); 
  }
}

//all questions function
async function allQuestions(req, res) {
  try {
    //query all questions from the questions database
    const [allQuestion] = await dbConnection.query(
      "SELECT q.title, q.description, q.questionid ,q.tag ,u.username  FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC;"
    );
    return res.status(StatusCodes.OK).json({ allQuestion });
  } catch (error) {
    // Log and return a 500 internal server error response if an error occurs
    // console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again" });
  }
}

//single questions function
async function singleQuestions(req, res) {
  const questionid = req.params.questionid;

  try {
    // Perform a SELECT query to fetch a single question by its ID
    const query = "SELECT * FROM questions WHERE questionid = ?";
    const question = await dbConnection.query(query, [questionid]);
    // console.log(query)
    // console.log(question[0]);

    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }
    // Send the retrieved question as a JSON response
    res.status(200).json(question[0]);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong while fetching the question" });
  }
}

module.exports = { postQuestions, allQuestions, singleQuestions };

