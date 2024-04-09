import QuestionModel from "./question-model.js";
import mongoose from "mongoose";
import "dotenv/config.js";

let mongoDBUri;
if (process.env.ENV === "PROD") {
  mongoDBUri = process.env.DB_CLOUD_URI;
} else if (process.env.ENV === "DOCKER") {
  mongoDBUri = process.env.DB_DOCKER_URI;
} else {
  mongoDBUri = process.env.DB_LOCAL_URI;
}

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("connected", () => console.log("Question Service MongoDB Connected!"));
db.on(
  "error",
  console.error.bind(console, "Question Service MongoDB connection error:")
);

export async function createQuestion(params) {
  params._id = new mongoose.Types.ObjectId();

  return new QuestionModel(params);
}

export async function findAllQuestions(queryOptions) {
  return QuestionModel.find(queryOptions);
}

export async function findQuestionById(id) {
  return QuestionModel.findOne({ _id: id });
}

export async function findQuestionByTitle(title) {
  return QuestionModel.findOne({title : title});
}

export async function updateQuestion(
  id,
  title,
  description,
  category,
  complexity
) {
  return QuestionModel.updateOne(
    { _id: id },
    {
      $set: {
        title: title,
        description: description,
        category: category,
        complexity: complexity,
      },
    }
  );
}

export async function deleteQuestion(id) {
  return QuestionModel.deleteOne({ _id: id });
}
