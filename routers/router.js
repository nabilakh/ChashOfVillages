const express = require('express');
const router = express.Router();
const userRouter = require('./user')
const auth = require('../middlewares/authJwt');
const marketRouter = require('./market')
const farmRouter = require('./farm')
const barrackRouter = require('./barrack')
const invadeRouter = require('./invade')
const errorHandler = require("../middlewares/errorHandler");


//  Welcome message
router.get("/", (req, res, next) => {
    res.send("Welcome to Clash of Villages - Online Multiplayer Games");
  });

router.use('/user', userRouter); 
router.use(auth.authentication); 
router.use('/market', marketRouter); 
router.use('/farm', farmRouter);
router.use('/barrack', barrackRouter);
router.use('/invade', invadeRouter);
 
router.use(errorHandler);
module.exports = router;