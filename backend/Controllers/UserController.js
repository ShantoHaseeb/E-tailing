const Users = require("../Models/Users");
module.exports = {
  createAccount: async (req, res) => {
    const { name, email, pass } = req.body;

    try {
      const user = await Users.create({ name, email, pass });
      res.json(user);
    } catch (e) {
      if (e.code === 11000) return res.status(400).send("Already exists");
      res.status(400).send(e.message);
    }
  },

  signIn: async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await Users.credentials(email, pass);
      res.json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
