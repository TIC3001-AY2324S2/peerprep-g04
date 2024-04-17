import express from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  updateUserPrivilege,
  getPaginatedUsers
} from "../controller/user-controller.js";
import {
  verifyAccessToken,
  verifyEmail,
  verifyId,
  verifyIsAdmin,
} from "../middleware/basic-access-control.js";

const router = express.Router();

router.patch("/update-privilege", updateUserPrivilege);

router.get("/all", getAllUsers);

router.get("/paginatedUsers", getPaginatedUsers);

router.get("/", verifyAccessToken, verifyEmail, getUserByEmail);

router.get("/profile", getUserByEmail);

router.post("/", createUser);

router.patch("/", updateUser);

router.delete("/", deleteUser);

export default router;
