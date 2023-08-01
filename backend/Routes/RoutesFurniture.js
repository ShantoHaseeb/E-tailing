const router = require("express").Router();
const {
  addFurniture,
  findSimilar,
  category,
  find,
  updateFurniture,
  removeFurniture,
} = require("../Controllers/FurnitureController");

router.get("/", find);
router.post("/", addFurniture);
router.get("/:id", findSimilar);
router.get("/category/:category", category);
router.patch("/:id", updateFurniture);
router.delete("/:id", removeFurniture);

module.exports = router;
