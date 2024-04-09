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
    status: {
      type: String,
      default: "pending",
      required: [true, "Please include status"],
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
    timestamps: true,
  }
);

export default mongoose.model("MatchingModel", MatchingModelSchema);
