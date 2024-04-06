import express from "express";
import cors from "cors";
import "dotenv/config.js";

import matchingRoutes from "./routes/matching-service-routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

// To handle CORS Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
    return res.status(200).json({});
  }

  next();
});

app.use("/matching", matchingRoutes);

export default app;
