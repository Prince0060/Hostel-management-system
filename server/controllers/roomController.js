import asyncHandler from "express-async-handler";
import _ from 'underscore';
import Room from "../models/room.js";
import Student from "../models/student.js";
import { getIdFromToken } from "../utils/generateToken.js";

const addRoom = asyncHandler(async (req, res) => {
    const { _id, roomNo, roomType, floorNo } = req.body;
    const roomIdExist = await Room.findById(_id);

    if (roomIdExist) {
        roomIdExist.roomNo = roomNo;
        roomIdExist.roomType = roomType;
        roomIdExist.floorNo = floorNo;
        await roomIdExist.save();
        res.status(201).json({
            message: "update successfully",
        });
    }

    const roomExists = await Room.findOne({ roomNo });
    if (roomExists) {
        res.status(400);
        throw new Error("Room already exists");
    }
    const room = await Room.create({
        roomNo,
        roomType,
        floorNo,
    });

    if (room) {
        res.status(201).json({
            _id: room._id,
        });
    } else {
        res.status(400);
        throw new Error("Invalid room data");
    }
});

const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find({});
    res.json(rooms);
});


const getRoomById = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.roomId);

    if (room) {
        res.json(room);
    } else {
        res.status(404);
        throw new Error(req.params.roomId);
    }
});

const getRoomByStudentId = asyncHandler(async (req, res) => {
    var keyId = getIdFromToken(req, res);
    if (keyId === undefined) {
        res.status(404);
        throw new Error("Token not found");
    }
    const student = await Student.findById(keyId);
    const room = await Room.findOne({ studentInfo: { $elemMatch: { _id: student._id } } });
    if (room) {
        res.json(room);
        // res.json({ _id: room._id, roomNo: room.roomNo, roomType: room.roomType, floorNo: room.floorNo });
    } else {
        res.status(404);
        throw new Error("Room not found");
    }
});

const assignRoomToStudent = asyncHandler(async (req, res) => {
    const { studentId, roomId } = req.body;
    var student;
    if (studentId) {
        student = await Student.findById(studentId);
    } else {
        var keyId = getIdFromToken(req, res);
        if (keyId === undefined) {
            res.status(404);
            throw new Error("Token not found");
        }
        student = await Student.findById(keyId);
    }
    const room = await Room.findById(roomId);
    if (room && student) {
        const countStudent = room.studentInfo.length;
        if ((room.roomType == "Single" && countStudent < 1) || (room.roomType == "Sharing" && countStudent < 3)) {
            room.studentInfo.push({ _id: student._id, name: student.name, rollNumber: student.rollNumber });
            await room.save();
            res.json({ message: "Room successfully assigned" });
        } else {
            res.status(404);
            throw new Error("Room Already Filled");
        }
    } else {
        res.status(404);
        throw new Error("Room not found");
    }
});

const unAssignRoomToStudent = asyncHandler(async (req, res) => {
    const { studentId, roomId } = req.body;
    var student;
    if (studentId) {
        student = await Student.findById(studentId);
    } else {
        var keyId = getIdFromToken(req, res);
        if (keyId === undefined) {
            res.status(404);
            throw new Error("Token not found");
        }
        student = await Student.findById(keyId);
    }
    const room = await Room.findById(roomId);
    if (room && student) {
        // var ik = room.studentInfo.splice(room.studentInfo.findIndex(x => x._id == studentId), 1);
        // res.json(ik);
        room.studentInfo.splice(room.studentInfo.findIndex(x => x._id == studentId), 1)
        await room.save();
        res.json(room);
    } else {
        res.status(404);
        throw new Error("Room not found");
    }
});


const allotRoomsAuto = asyncHandler(async (req, res) => {
    const student = await Student.find({ year: 4, roomSuggestion: { $exists: true, $type: 'array', $ne: [] } }).sort({ cgpercent: -1 });
    const rooms = await Room.find({ roomType: 'Single' });
    if (student) {
        _.each(student, (val, key, obj) => {
            var sRooms = val.roomSuggestion;
            var isDone = false;
            _.each(sRooms, function (tr1, k1, o1) {
                if (!isDone) {
                    _.find(rooms, function (room) {
                        if (room._id == tr1._id && room.studentInfo.length === 0) {
                            room.studentInfo.push({ _id: val._id, name: val.name, rollNumber: val.rollNumber });
                            isDone = true;
                            console.log(room._id);
                        }
                    });
                }
            });
            if (!isDone) {
                _.find(rooms, function (room) {
                    if (room.studentInfo.length === 0) {
                        room.studentInfo.push({ _id: val._id, name: val.name, rollNumber: val.rollNumber });
                        isDone = true;
                        console.log(room._id);
                    }
                });
            }
            val.roomSuggestion = [];
        });
        await Room.bulkSave(rooms);
        await Student.bulkSave(student);
        res.json({ "message": "done" });
    }
    else {
        res.status(404);
        throw new Error("Students not found");
    }
    // res.json(student);
});

export {
    addRoom, allotRoomsAuto, assignRoomToStudent, getRoomById, getRoomByStudentId, getRooms, unAssignRoomToStudent
};

