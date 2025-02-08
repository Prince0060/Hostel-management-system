import asyncHandler from "express-async-handler";
import Announcenment from "../models/announcenment.js";

const addAnnouncenment = asyncHandler(async (req, res) => {
    const {
        heading,
        description,
        rollno,
        createdOnUtc,
        status
    } = req.body;

    // const announcenmentExist = await Announcenment.findOne({ _id: name });

    // if (studentExist) {
    //     res.status(400);
    //     throw new Error("Student already exists");
    // }

    const Obj = await Announcenment.create({
        heading,
        description,
        rollno,
        createdOnUtc,
        status
    });

    if (Obj) {
        res.status(201).json({
            _id: Obj._id,
            heading: Obj.heading,
            description: Obj.description,
            createdOnUtc: Obj.createdOnUtc,
            rollno: Obj.rollno,
            status: Obj.status,
        });
    } else {
        res.status(400);
        throw new Error("Invalid data");
    }
});
// const updateStudentProfile = asyncHandler(async (req, res) => {
//     const student = await Student.findById(req.body._id);

//     if (student) {
//         student.name = req.body.name || student.name;
//         student.address = req.body.address || student.address;
//         student.category = req.body.category || student.category;
//         student.city = req.body.city || student.city;
//         student.contact = req.body.contact || student.contact;
//         student.fatherContact = req.body.fatherContact || student.fatherContact;
//         student.image = req.body.image || student.image;
//         student.roomNo = req.body.roomNo || student.roomNo;
//         student.blockNo = req.body.blockNo || student.blockNo;
//         student.status = req.body.status || student.status;
//         const updatedStudent = await student.save();

//         res.json({
//             _id: updatedStudent._id,
//             name: updatedStudent.name,
//             address: updatedStudent.address,
//             category: updatedStudent.category,
//             city: updatedStudent.city,
//             contact: updatedStudent.contact,
//             fatherContact: updatedStudent.fatherContact,
//             image: updatedStudent.image,
//             roomNo: updatedStudent.roomNo,
//             blockNo: updatedStudent.blockNo,
//             status: updatedStudent.status,
//         });
//     } else {
//         res.status(404);
//         throw new Error("Student not found");
//     }
// });
const getAllAnnouncenment = asyncHandler(async (req, res) => {
    const pageSize = 15;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};

    const count = await Announcenment.countDocuments();
    const announcenments = await Announcenment.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    if (announcenments && announcenments.length != 0) {
        res.json({ announcenments, page, pages: Math.ceil(count / pageSize) });
    } else {
        res.status(404);
        throw new Error("No Announcenment Found");
    }
});

const getSpecificAnnouncenment = asyncHandler(async (req, res) => {
    const pageSize = 15;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};

    const count = await Announcenment.countDocuments();
    const announcenments = await Announcenment.find({rollno:'all'})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    if (announcenments && announcenments.length != 0) {
        res.json({ announcenments, page, pages: Math.ceil(count / pageSize) });
    } else {
        res.status(404);
        throw new Error("No Announcenment Found");
    }
});

const deleteAnnouncenment = asyncHandler(async (req, res) => {
    const thisObj = await Announcenment.findById(req.params.id);

    if (thisObj) {
        await thisObj.remove();
        res.json({ message: "Announcenment removed" });
    } else {
        res.status(404);
        throw new Error("Announcenment not found");
    }
});


const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error("Students not found");
    }
});

export {
    addAnnouncenment, deleteAnnouncenment, getAllAnnouncenment, getSpecificAnnouncenment
};

