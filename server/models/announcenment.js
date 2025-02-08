import mongoose from "mongoose";

const announcenmentSchema = mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rollno: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Announcenment = mongoose.model("Announcenment", announcenmentSchema);

export default Announcenment;
