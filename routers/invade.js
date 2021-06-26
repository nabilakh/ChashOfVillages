const express = require("express");
const router = express.Router();
const invadeController = require("../controllers/invadeController");

router.post("/:id", invadeController.invade);
     
module.exports = router;
