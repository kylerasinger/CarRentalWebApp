const { User } = require("../models/user");
const validateReqBody = require("../middleware/validateReqBody");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const invalidError = "Invalid email or password.";

router.post("/", validateReqBody(validate), async (req, res) => {
let user = await User.findOne({ email: req.body.email });
if (!user) return res.status(400).send(invalidError);
    const isValid = validate(req.body);

if (isValid.error) return res.status(400).send(invalidError);
    const validPassword = await bcrypt.compare(req.body.password, user.password);

if (!validPassword) return res.status(400).send(invalidError);
    const token = user.generateAuthToken();
res.send(token);
});

function validate(data) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailMinLength = 5;
const emailMaxLength = 255;
const passwordMinLength = 8;
const passwordMaxLength = 255;

if (
    typeof data.email !== "string" ||
    !emailRegex.test(data.email) ||
    data.email.length < emailMinLength ||
    data.email.length > emailMaxLength
) {
    return { error: "Invalid email format" };
}

if (
    typeof data.password !== "string" ||
    data.password.length < passwordMinLength ||
    data.password.length > passwordMaxLength
) {
    return {
      error: `Password must be a string between ${passwordMinLength} and ${passwordMaxLength} characters long`
    };
}

return {};
}

module.exports = router;
