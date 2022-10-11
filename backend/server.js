const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/noteRoutes");
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
//------------------------------------deployment----------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
