const express = require("express");
const router = express.Router();
const marketController = require('../controllers/marketController');



//   untuk membuat market baru
router.post("/create", marketController.createMarket); 

//  Menampilkan semua data market
router.get("/all", marketController.findAllMarket);
 
// Melihat detail market dengan id
router.get("/:id", marketController.ById);
 
// mengganti nama market
router.put("/:id", marketController.updateMarket);

// Menghapus market
router.delete("/:id", marketController.deleteMarket);

//   untuk collect gold pada market tertentu
router.get("/collect/:id", marketController.collectGold);

module.exports = router;