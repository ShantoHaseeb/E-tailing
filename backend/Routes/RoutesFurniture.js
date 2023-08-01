const router = require("express").Router();
const { addFurniture } = require("../Controllers/FurnitureController");

router.post("/", addFurniture);

module.exports = router;
