import QuestionModel from "./question-model.js";
import mongoose from "mongoose";
import "dotenv/config.js";

let mongoDBUri =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

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

export async function findAllQuestions() {
  return QuestionModel.find();
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
