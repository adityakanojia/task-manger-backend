const Task = require('../models/task');

const getTasksHandler  = async (req, res) => {
    try {
        const { search, status, page = 1, limit = 10} = req.query;
        
        const query = { user : req.user.id };

        //Getting search query
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (status && ["pending", "done"].includes(status)) {
            query.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const tasks = await Task.find(query)
        .sort({ createdAt: -1 }) // newest first
        .skip(skip)
        .limit(parseInt(limit));

        const total = await Task.countDocuments(query);

        if (tasks.length === 0) {
            return res.status(200).json({
                message: "Yay you're all done",
                total: 0,
                page: parseInt(page),
                pages: 0,
                tasks: [],
            });
        }

        return res.status(200).json({
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            tasks,
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
}

const addTaskHandler = async (req, res) => {
    try {
        const { title, description} = req.body;

        if(!title) return res.status(400).send("Add the title");
        
        const newTask = await Task.create({title, description, user: req.user.id});
        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).send("Server error")
    }
}

const deleteTaskHandler = async (req, res) => {
    try {
        const taskId = req.params.id;     
        const id = req.user.id;
        const task = await Task.findById(taskId)

        if (!task) return res.status(404).send("No such task");

        if (task.user.toString() !== id) {
            return res.status(403).send("Not authorized to delete this task");
        }
        
        await task.deleteOne();

        return res.status(200).send("task deleted!")
    } catch (error) {
        res.status(500).send("SERVER ERROR")
    }
}

const editTaskHandler = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const { title, description, status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send("No such task");

    if (task.user.toString() !== userId) {
      return res.status(403).send("Not authorized to update this task");
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status && ["pending", "done"].includes(status)) {
      task.status = status;
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).send("SERVER ERROR");
  }
};

module.exports = { getTasksHandler, addTaskHandler, deleteTaskHandler, editTaskHandler}