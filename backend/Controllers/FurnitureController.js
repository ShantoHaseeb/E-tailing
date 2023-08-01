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
};
