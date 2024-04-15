import mongoose from "mongoose";

const MatchingModelSchema = mongoose.Schema(
  {
    userOne: {
      type: String,
      required: [true, "Please include user one"],
    },
    userTwo: {
      type: String,
      required: [false],
    },
    userOneName: {
      type: String,
      required: [false],
    },
    userTwoName: {
      type: String,
      required: [false],
    },
    roomKey: {
      type: String,
      required: [false],
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
    timestamps: true,
  }
);

export default mongoose.model("MatchingModel", MatchingModelSchema);
