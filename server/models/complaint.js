import mongoose from "mongoose";

const complaintSchema = mongoose.Schema(
    {
        complaintType: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        action: {
            type: Number,
            required: true,
        },
        roomInfo: {
            type: Map,
            default: {},
            required: true
        },
        studentInfo: {
            type: Map,
            default: {},
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint
