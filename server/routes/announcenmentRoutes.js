import express from "express";
import {
    addAnnouncenment,
    deleteAnnouncenment,
    getAllAnnouncenment,
    getSpecificAnnouncenment
} from "../controllers/announcenmentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/getAllAnnouncenment").get(getAllAnnouncenment);
router.route("/getSpecificAnnouncenment").get(getSpecificAnnouncenment);
router.route("/addAnnouncenment").post(protect, admin, addAnnouncenment);
router.route("/delete/:id").get(protect, admin, deleteAnnouncenment);
export default router;
