const router = require("express").Router();
const {
  addFurniture,
  findSimilar,
  category,
} = require("../Controllers/FurnitureController");

router.post("/", addFurniture);
router.get("/:id", findSimilar);
router.get("/category/:category", category);

module.exports = router;
