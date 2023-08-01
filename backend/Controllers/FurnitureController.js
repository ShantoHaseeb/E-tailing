const Furniture = require("../Models/Furniture");
const Users = require("../Models/Users");

module.exports = {
  addFurniture: async (req, res) => {
    try {
      const { model, details, specs, price, category, pictures } = req.body;
      const furniture = await Furniture.create({
        model,
        details,
        specs,
        price,
        category,
        pictures,
      });
      const furnitures = await Furniture.find(furniture);
      res.status(201).json(furnitures);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
  findSimilar: async (req, res) => {
    const { id } = req.params;
    try {
      const furniture = await Furniture.findById(id);
      const similar = await Furniture.find({
        category: furniture.category,
      }).limit(5);
      res.status(200).json({ furniture, similar });
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
  category: async (req, res) => {
    const { category } = req.params;
    try {
      let furnitures;
      const sort = { _id: -1 };
      if (category == "all") {
        furnitures = await Furniture.find().sort(sort);
      } else {
        furnitures = await Furniture.find({ category }).sort(sort);
      }
      res.status(200).json(furnitures);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
