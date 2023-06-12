const { Client } = require("../model/model");

module.exports = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const newClient = new Client({
      clientName: name,
    });
    await newClient.save();
    res.status(201);
    res.send({
      status: 201,
      response: {
        clientId: newClient._id,
        ...req.body,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(err.status || 400);
    res.send({
      status: err.status || 400,
      response: err.message || "Could not create or update state.",
    });
  }
};
