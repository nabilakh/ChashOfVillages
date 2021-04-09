const express = require("express");
const router = express.Router();
const barrackController = require('../controllers/barrarckController');


//   untuk membuat barrack baru
router.post("/create", barrackController.createBarrack); 

//  Menampilkan semua data barrack
router.get("/all", barrackController.findAllBarrack);

// Melihat detail barrack dengan id
router.get("/:id", barrackController.ById);

// mengganti nama barrack
router.put("/:id", barrackController.updateBarrack);

// Menghapus Barrack
router.delete("/:id", barrackController.deleteBarrack);

//   untuk collect gold pada barrack tertentu
router.get("/collect/:id", barrackController.collectSoldier);

module.exports = router;