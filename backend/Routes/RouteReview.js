const router = require("express").Router();
const { writeReview, getReview } = require("../Controllers/ReviewController");

router.post("/writeReview/:id", writeReview);
router.get("/getReview/:id", getReview);

module.exports = router;
