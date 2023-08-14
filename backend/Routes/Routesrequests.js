const router = require("express").Router();
const { getreq, addreq } = require("../Controllers/RequestController");

router.get("/", getreq);

router.post("/create", addreq);

module.exports = router;
