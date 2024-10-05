const router = require("express").Router();
const verifyToken = require("../contollers/verifyTokenController");
const commandController = require("../contollers/commandController");
const Command = require("../models/command");

//createCommand
router.post("/createCommand", commandController.createCommand);

//updateCommand
router.put(
  "/updateCommand/:id",
  verifyToken.verifyTokenAndAdmin,
  commandController.updateCommand
);

//deleteCommand
router.delete(
  "/deleteCommand/:id",

  commandController.deleteCommand
);

//getCommandByUserId
router.get("/getCommandById/:userId", commandController.getCommandByUserId);

//getAllCommands
router.get(
  "/getAllCommands",
  verifyToken.verifyTokenAndAdmin,
  commandController.getAllCommands
);

//getMonthlyIncome

router.get(
  "/getMonthlyIncome",
  verifyToken.verifyTokenAndAdmin,
  async (req, res) => {
    console.log(req.body);
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Command.aggregate([
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
  }
);

module.exports = router;
