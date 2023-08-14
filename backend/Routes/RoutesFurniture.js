const router = require("express").Router();
const {
  addFurniture,
  findSimilar,
  category,
  find,
  updateFurniture,
  removeFurniture,
  addtocart,
  removecart,
} = require("../Controllers/FurnitureController");

router.get("/", find);
router.post("/", addFurniture);
router.get("/:id", findSimilar);
router.get("/category/:category", category);
router.patch("/:id", updateFurniture);
router.delete("/:id", removeFurniture);
router.post("/add-to-cart", addtocart);
router.post("/remove-from-cart", removecart);

module.exports = router;
