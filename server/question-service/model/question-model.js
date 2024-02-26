import mongoose from "mongoose";

const QuestionModelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a question title"],
    },
    description: {
      type: String,
      required: [true, "Please include question description"],
    },
    category: {
      type: String,
      required: [true, "Please include question category"],
    },
    complexity: {
      type: String,
      required: [true, "Please include question complexity"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("QuestionModel", QuestionModelSchema);
