const express = require("express");
const router = express.Router();
const farmController = require('../controllers/farmControler');


//   untuk membuat farm baru
router.post("/create", farmController.createFarm); 

// //  Menampilkan semua data farm
router.get("/all", farmController.findAllFarm);

// // Melihat detail farm dengan id
router.get("/:id", farmController.ById);

// // mengganti nama farm
router.put("/:id", farmController.updateFarm);

// // Menghapus farm
router.delete("/:id", farmController.deleteFarm);

// //   untuk collect food pada farm tertentu
router.get("/collect/:id", farmController.collectFood);


module.exports = router;