const router = require("express").Router();
const { createAccount, signIn } = require("../Controllers/UserController");

router.post("/CreateAccount", createAccount);
router.post("/SignIn", signIn);

module.exports = router;
