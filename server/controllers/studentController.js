import asyncHandler from "express-async-handler";
import nodemailer from 'nodemailer';
import Student from "../models/student.js";
import { generateToken, getIdFromToken } from "../utils/generateToken.js";


// GET STUDENT BY ID
const getStudentById = asyncHandler(async (req, res) => {
  var keyId = getIdFromToken(req, res);
  if (keyId === undefined) {
    res.status(404);
    throw new Error("Token not found");
  }
  const student = await Student.findById(keyId);
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

// GET STUDENT BY ROOM NO
const getStudentByRoomNo = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findOne({
    date: Date().toString().substring(0, 15),
    roomNo: { $in: [req.params.roomId] },
  });
  const students = await Student.find({ roomNo: req.params.roomId });
  if (students) {
    attendance
      ? res.json({ students: students, attendance: attendance })
      : res.json({ students: students });
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});


// ADD NEW STUDENT
const addStudent = asyncHandler(async (req, res) => {
  const {
    rollNumber,
    branch,
    year,
    name,
    address,
    fatherName,
    motherName,
    contactNumber,
    parentsContactNumber,
    email,
    password,
    cgpercent
  } = req.body;

  const studentExist = await Student.findOne({ email: email });

  if (studentExist) {
    res.status(400);
    throw new Error("Student already exists");
  }

  const student = await Student.create({
    rollNumber,
    branch,
    year,
    name,
    address,
    fatherName,
    motherName,
    contactNumber,
    parentsContactNumber,
    email,
    password,
    cgpercent,
    status: true,
    isverified: false
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Student data");
  }
});


// STUDENT LOGIN
const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      isAdmin: student.isAdmin,
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: "i",
      },
    }
    : {};

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (students && students.length != 0) {
    res.json({ students, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("No Students Found");
  }
});


// GET STUDENT BY ID
const sendMail = asyncHandler(async (req, res) => {
  var keyId = getIdFromToken(req, res);
  if (keyId === undefined) {
    res.status(404);
    throw new Error("Token not found");
  }
  const student = await Student.findById(keyId);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "surajdeoraj99@gmail.com",
      pass: "qmbsjilkcnsvkmvz",
    },
  });

  let message = {
    from: 'surajdeoraj99@gmail.com', // sender address
    to: student.email, // list of receivers
    subject: 'Welcome to HMS!', // Subject line
    html: "<b>Hi, Kindly verify your email address</b> <p> Click on link: http://localhost:4200/verify/" + student._id + "  </p>", // html body
  };

  transporter.sendMail(message).then((info) => {
    return res.status(201).json(
      {
        msg: "Email sent",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)
      }
    )
  }).catch((err) => {
    return res.status(500).json({ msg: err });
  }
  );

});

// STUDENT LOGIN
const verifyStudent = asyncHandler(async (req, res) => {
  var keyId = getIdFromToken(req, res);
  if (keyId === undefined) {
    res.status(404);
    throw new Error("Token not found");
  }
  const student = await Student.findById(keyId);
  if (student && (student._id == req.params.id)) {
    student.isverified = true;
    await student.save();
    return res.status(201).json(
      {
        message: "Email verified",
      });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// GET STUDENT BY ID
const studentRoomSuggestion = asyncHandler(async (req, res) => {
  var keyId = getIdFromToken(req, res);
  if (keyId === undefined) {
    res.status(404);
    throw new Error("Token not found");
  }
  const student = await Student.findById(keyId);
  const { rooms } = req.body;
  if (student) {
    student.roomSuggestion = rooms;
    await student.save();
    res.json({ message: 'save succussfully' });
  } else {
    res.status(404);
    throw new Error("Students not found");
  }
});

export {
  addStudent, authStudent, getAllStudents, getStudentById, getStudentByRoomNo, sendMail, studentRoomSuggestion, verifyStudent
};

