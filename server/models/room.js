import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        roomNo: {
            type: String,
            required: true,
        },
        roomType: {
            type: String,
            required: true,
        },
        floorNo: {
            type: Number,
            required: true,
        },
        studentInfo: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
