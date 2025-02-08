import express from "express";
import {
    addComplaint,
    closeComplaintById,
    getComplaintById,
    getComplaints, getStudentComplaints
} from "../controllers/complaintController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/")
    .get(protect, admin, getComplaints)
    .post(protect, addComplaint);
router.route("/getStudentComplaints")
    .get(protect, getStudentComplaints);
router.route("/getComplaintById/:id")
    .get(protect, getComplaintById);
router.route("/closeComplaintById/:id")
    .get(protect, closeComplaintById);


export default router;
