const express = require("express");
const updateAppState = require("../controllers/updateAppState");
const createClient = require("../controllers/createClient");

const router = express.Router();

router.post("/updateAppState", updateAppState);

router.post("/client", createClient);

module.exports = router;
