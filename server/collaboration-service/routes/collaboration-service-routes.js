import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Collaboration Service");
});

export default router;
