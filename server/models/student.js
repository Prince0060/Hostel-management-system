import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    parentsContactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    cgpercent: {
      type: Number
    },
    isverified: {
      type: Boolean,
      default: false,
      required: true
    },
    status: {
      type: String,
      required: true,
    },
    roomSuggestion: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
