const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort("email");
  res.send(users);
});

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email }).select("_id");
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    res.send({ userId: user._id });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;