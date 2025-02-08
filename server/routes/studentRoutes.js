import express from "express";
import {
  addStudent,
  authStudent,
  getAllStudents,
  getStudentById,
  sendMail,
  studentRoomSuggestion,
  verifyStudent
} from "../controllers/studentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/login")
  .post(authStudent);

router
  .route("/allStudents")
  .get(protect, admin, getAllStudents);

router
  .route("/sendmail")
  .get(protect, sendMail);

router
  .route("/roomSuggestion")
  .post(studentRoomSuggestion);

router
  .route("/verifyStudent/:id")
  .get(protect, verifyStudent);

router
  .route("/")
  .get(getStudentById)
  .post(addStudent);

router
  .route("/:id")
  .get(getStudentById);





export default router;
