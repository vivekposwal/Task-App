const express = require("express");
const {
  getTasks,
  getTaskById,
  UpdateTask,
  DeleteTask,
} = require("../controllers/noteControllers");
const { CreateTask } = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.route("/").get(protect, getTasks);
router.route("/create").post(protect, CreateTask);
router
  .route("/:id")
  .get(getTaskById)
  .put(protect, UpdateTask)
  .delete(protect, DeleteTask);
module.exports = router;
