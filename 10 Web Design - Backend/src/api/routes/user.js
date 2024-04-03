const { auth } = require("../../middlewares/auth");
const { getUser, userUpdate, deleteUser } = require("../controllers/user");
const { admin } = require("../../middlewares/admin");

const userRouter = require("express").Router();

userRouter.get("/", getUser);
userRouter.put("/:id", [auth], userUpdate);
userRouter.delete("/:id", [admin], deleteUser);

module.exports = userRouter;
