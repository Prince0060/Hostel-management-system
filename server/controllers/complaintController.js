import asyncHandler from "express-async-handler";
import Complaint from "../models/complaint.js";
import Room from "../models/room.js";
import Student from "../models/student.js";
import { getIdFromToken } from "../utils/generateToken.js";

const addComplaint = asyncHandler(async (req, res) => {
    const { complaintType, description, action } = req.body;

    var keyId = getIdFromToken(req, res);
    if (keyId === undefined) {
        res.status(404);
        throw new Error("Token not found");
    }
    const student = await Student.findById(keyId);
    // const room = await getRoomByStudentId(req, res);
    const room = await Room.findOne({ studentInfo: { $elemMatch: { _id: student._id } } });

    const complaintObj = await Complaint.create({
        complaintType,
        description,
        action,
        studentInfo: { _id: student._id, name: student.name },
        roomInfo: { _id: room._id, roomNo: room.roomNo, roomType: room.roomType, floorNo: room.floorNo }
    });

    if (complaintObj) {
        res.status(201).json({
            _id: complaintObj._id,
        });
    } else {
        res.status(400);
        throw new Error("Invalid Complaint data");
    }
});

const getComplaints = asyncHandler(async (req, res) => {
    const date = req.body.date || Date().toString().substring(0, 15);
    const complaints = await Complaint.find()
    if (complaints) {
        res.json(complaints);
    } else {
        res.status(404);
        throw new Error(`No Complaints ${date}!!`);
    }
});

const getComplaintById = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
        res.json(complaint);
    } else {
        res.status(404);
        throw new Error(req.params.id);
    }
});

const getStudentComplaints = asyncHandler(async (req, res) => {
    const date = req.body.date || Date().toString().substring(0, 15);

    var keyId = getIdFromToken(req, res);
    if (keyId === undefined) {
        res.status(404);
        throw new Error("Token not found");
    }
    const student = await Student.findById(keyId);

    const complaints = await Complaint.find({ studentInfo: { _id: student._id, name: student.name } });
    if (complaints) {
        res.json(complaints);
    } else {
        res.status(404);
        throw new Error(`No Complaints ${date}!!`);
    }
});

const closeComplaintById = asyncHandler(async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint) {
        complaint.action = 2;
        await complaint.save();
        res.json(complaint);
    } else {
        res.status(404);
        throw new Error(req.params.id);
    }
});


const getAttendanceByRoomNo = asyncHandler(async (req, res) => {
    const date = req.body.date || Date().toString().substring(0, 15);
    const attendance = await Attendance.findOne({
        roomNo: { $in: [req.body.roomNo] },
        date: date,
    });
    if (attendance) {
        res.json(attendance);
    } else {
        res.status(404);
        throw new Error(
            `You didn't take attendance today for room  No:${req.params.roomId}`
        );
    }
});



const enterAttendanceByRoomNo = asyncHandler(async (req, res) => {
    const date = req.body.date || Date().toString().substring(0, 15);
    const attendance = await Attendance.findOne({
        date: date,
    });
    if (attendance) {
        const dataTemp = attendance.data;
        const detailsTemp = attendance.details;
        for (const [key, value] of Object.entries(req.body.data)) {
            dataTemp.set(key, value);
        }
        for (const [key, value] of Object.entries(req.body.details)) {
            detailsTemp.set(key, value);
        }
        attendance.details = detailsTemp;
        attendance.data = dataTemp;

        const updatedAttendance = await attendance.save();
        res.json(updatedAttendance);
    } else {
        const newAttendance = await Attendance.create({
            roomNo: [req.body.roomNo],
            date: date,
            data: req.body.data,
            details: req.body.details,
        });
        res.json(newAttendance);
    }
});

const deleteAttendanceByDays = asyncHandler(async (req, res) => {
    const days = req.params.days;
    var date = new Date();
    var deletionDate = new Date(date.setDate(date.getDate() - days));
    await Attendance.deleteMany({
        createdAt: { $lt: deletionDate },
    });
    res.json({ message: `Deleted Attendance for before past ${days} days` });
});

export {
    addComplaint, closeComplaintById, getComplaintById, getComplaints, getStudentComplaints
};

