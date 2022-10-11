const Task = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});
const CreateTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
  } else {
    const task = new Task({ user: req.user._id, title, content, category });

    const createdTask = await task.save();

    res.status(201).json(createdTask);
  }
});
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});
const UpdateTask = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (task) {
    task.title = title;
    task.content = content;
    task.category = category;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});
const DeleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (task) {
    await task.remove();
    res.json({ message: "Task Removed" });
  } else {
    res.status(404);
    throw new Error("Task not Found");
  }
});

module.exports = { CreateTask, getTasks, getTaskById, UpdateTask, DeleteTask };
