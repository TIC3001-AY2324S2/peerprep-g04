// import MatchingModel from "./matching-model.js";
// import mongoose from "mongoose";
// import "dotenv/config.js";

// let mongoDBUri;
// if (process.env.ENV === "PROD") {
//   mongoDBUri = process.env.DB_CLOUD_URI;
// } else if (process.env.ENV === "DOCKER") {
//   mongoDBUri = process.env.DB_DOCKER_URI;
// } else {
//   mongoDBUri = process.env.DB_LOCAL_URI;
// }

// mongoose.connect(mongoDBUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let db = mongoose.connection;
// db.on("connected", () => console.log("Matching Service MongoDB Connected!"));
// db.on(
//   "error",
//   console.error.bind(console, "Matching Service MongoDB connection error:")
// );

// export async function getAllMatch(options) {
//   return MatchingModel.find(options);
// }

// export async function findMatchByUserId(userId) {
//   return MatchingModel.findOne({
//     $or: [{ userOne: userId }, { userTwo: userId }],
//   });
// }

// export async function createMatch(params) {
//   params._id = new mongoose.Types.ObjectId();

//   return new MatchingModel(params);
// }

// export async function deleteMatch(id) {
//   return MatchingModel.deleteOne({ _id: id });
// }
