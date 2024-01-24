// import modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

// import routes
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");

// import from config-files
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// create server =================================
const app = express();

// get port no. =================================
const PORT = process.env.PORT || 4000;

// database connect =================================
database.connect();

// middlewares ===================================
app.use(express.json());
app.use(cookieParser());
// Handle requests from frontend (PORT 3000)
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

// Cloudinary connection ============================
cloudinaryConnect();

// routes mount ===============================
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// default route ================================
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up & running !!",
    });
});

// Activate server ================================
app.listen(PORT, () => {
    console.log(`App is running at PORT no. ${PORT}`);
});
