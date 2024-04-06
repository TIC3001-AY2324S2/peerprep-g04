import mongoose from "mongoose";

const MatchingModelSchema = mongoose.Schema(
  {
    userOne: {
      type: String,
      required: [true, "Please include user one"],
    },
    userTwo: {
      type: String,
      required: [true, "Please include user two"],
    },
    roomKey: {
      type: String,
      required: [true, "Please include room key"],
    },
    category: {
      type: String,
      required: [true, "Please include category"],
    },
    complexity: {
      type: String,
      required: [true, "Please include complexity"],
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("MatchingModel", MatchingModelSchema);
