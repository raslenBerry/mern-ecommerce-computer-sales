const Command = require("../models/command");

const commandController = {
  createCommand: async (req, res) => {
    const data = req.body;
    console.log(data);
    const newCommand = new Command(data);
    try {
      const savedCommand = await newCommand.save();
      res.status(200).send(savedCommand);
      console.log("savedCommand : " + savedCommand);
    } catch (error) {
      res.status(500).send(error);
      console.log("error : " + error);
    }
  },

  updateCommand: async (req, res) => {
    const commandId = req.params.id;
    const data = req.body;
    try {
      const updatedCommand = await Command.findByIdAndUpdate(commandId, data, {
        new: true,
      });
      res.status(200).send(updatedCommand);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteCommand: async (req, res) => {
    try {
      const deletedCommand = await Command.findByIdAndDelete(req.params.id);
      res.status(200).send(deletedCommand);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getCommandByUserId: async (req, res) => {
    try {
      const command = await Command.find({ userId: req.params.userId });
      res.status(200).send(command);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getAllCommands: async (req, res) => {
    try {
      const commands = (await Command.find().limit(5));
      res.status(200).send(commands);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getMonthlyIncome: async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commandController;
