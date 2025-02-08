import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import announcenmentRoutes from "./routes/announcenmentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
import connectDB from "./config/mongoDBConfig.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();
connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// FOR CORS
var whitelist = ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:5000', undefined]
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
//END CORS

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/student", studentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/announcement", announcenmentRoutes);
app.use("/room", roomRoutes);
app.use("/complaint", complaintRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
