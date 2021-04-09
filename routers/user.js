const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const authJwt = require("../middlewares/authJwt");
const autho = require("../middlewares/authorization");


// User Register
router.post("/register", userController.register);

// authentication
router.get("/", authJwt.authentication, userController.townhall);

// User Login 
router.post("/login", userController.login);

// Menampilkan semua data user
router.get("/all", userController.findAllUser);

// Update data User
router.put("/:id", authJwt.authentication, autho.userAutho, userController.updateUser);

//Delete data User
router.delete("/:id", authJwt.authentication, autho.userAutho, userController.deleteUser);


module.exports = router;