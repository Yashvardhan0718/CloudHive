import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
  handleValidationErrors,
} from "../middleware/validators";
import { authenticate } from "../middleware/authentication";

const router = express.Router();

router
  .route("/")
  .post(createUserValidation, handleValidationErrors, createUser);
router.route("/").delete(authenticate, deleteUser);
router
  .route("/login")
  .post(loginUserValidation, handleValidationErrors, loginUser);
router.route("/profile").get(authenticate, getUser);
router
  .route("/profile")
  .put(authenticate, updateUserValidation, handleValidationErrors, updateUser);

export default router;
