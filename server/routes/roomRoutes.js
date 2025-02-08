import express from "express";
import {
    addRoom,
    allotRoomsAuto,
    assignRoomToStudent,
    getRoomById,
    getRoomByStudentId,
    getRooms,
    unAssignRoomToStudent
} from "../controllers/roomController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/assign")
    .post(protect, assignRoomToStudent);

router.route("/unassign")
    .post(protect, admin, unAssignRoomToStudent);

router.route("/getRoomByStudentId")
    .get(protect, getRoomByStudentId);

router.route("/allotRoomsAuto")
    .get(protect, admin, allotRoomsAuto);

router.route("/:roomId").get(protect, getRoomById);

router.route("/")
    .get(protect, getRooms)
    .post(protect, admin, addRoom);

export default router;
