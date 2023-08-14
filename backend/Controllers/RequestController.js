const Request = require("../Models/Request");
module.exports = {
  getreq: async (req, res) => {
    try {
      const requests = await Request.find();
      res.json(requests);
    } catch (err) {}
  },

  addreq: async (req, res) => {
    try {
      const { productName, description } = req.body;
      const request = await Request.create({ productName, description });
      res.json(request);
    } catch (err) {}
  },
};
