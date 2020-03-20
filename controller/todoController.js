const Todo = require("../models/Todo");
const { createValidation } = require("./validation/TodoValidation");

module.exports.index = async (req, res) => {
  const seletor = req.query.status
    ? { status: req.query.status, user_id: req.user._id }
    : { user_id: req.user._id };
  try {
    if (req.query.textSearch) {
      var todos = await Todo.find({
        user_id: req.user._id,
        $or: [{ title: new RegExp(req.query.textSearch, "i") }]
      }).select("_id title status");
    } else {
      var todos = await Todo.find(seletor).select("_id title status");
    }

    // const todos = await Todo.find({
    //   $or: [
    //     { $text: { $search: req.query.textSearch } },
    //     { title: new RegExp(req.query.textSearch, "i") }
    //   ]
    // }).select("_id title status");
    res.status(201).json({
      status: 200,
      message: "get list todo success",
      data: todos,
      total: todos.length
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.create = async (req, res) => {
  const { error } = createValidation(res.body);
  if (error) return res.status(400).send(error);
  const todo = new Todo({
    user_id: req.user._id,
    title: req.body.title
  });
  try {
    const saveTodo = await todo.save();
    res
      .status(201)
      .json({ status: 200, message: "add todo success", data: saveTodo });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.find = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res
      .status(201)
      .json({ status: 200, message: "get todo by id success", data: todo });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.update = async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { status: req.body.status } }
    );
    res
      .status(201)
      .json({ status: 200, message: "update todo success", data: updateTodo });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const findTodo = await Todo.findOne({
      _id: req.params.id,
      user_id: req.user._id
    });
    if (findTodo) {
      const removeTodo = await Todo.remove({ _id: req.params.id });
      res.status(201).json({
        status: 200,
        message: "Delete todo success",
        data: removeTodo
      });
    } else {
      res.status(400).json({ message: "Action does exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.changeStatus = async (req, res) => {
  try {
    const data = await Todo.updateMany({ status: req.body.status });
    res
      .status(201)
      .json({ status: 200, message: "chang status todo success", data: data });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.deleteComplele = async (req, res) => {
  try {
    await Todo.deleteMany({ status: true });
    res
      .status(201)
      .json({ status: 200, message: "Delete todo complete success" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
