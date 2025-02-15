import express from "express";
import {
  authUser,
  deleteUser,
  getDashboardInfo,
  getUserById,
  getUserByToken,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.route("/info").get(protect, getUserByToken);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/dashboardInfo")
  .get(protect, getDashboardInfo);
  
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);






export default router;
