const mongoose = require('mongoose');
const cron = require("node-cron");
const Market = require("../models/Market");
const Farm = require("../models/Farm");
const Barrack = require("../models/Barrack");
require ("dotenv").config()

const connectDB = () => {  
const pathURL = 'process.env.MongoDB_URL';
const connectionOption = {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false, 
}
mongoose.connect(pathURL, connectionOption);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database clashOfVillages Connected");
});

// CRON MARKET, FARM AND BARRACK
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", function () {
  const task = cron.schedule(
    "0/60 * * * * *",
    () => {
      Market.updateMany({ generatedGold : {$lt : 20 }}, { $inc: { generatedGold: 1 }} )
      .then((_) => {})
      .catch((err) => {
        res.send(err);
      });
      Farm.updateMany({  generatedFood : {$lt : 20 }}, { $inc: {  generatedFood: 1 }} )
      .then((_) => {})
      .catch((err) => {
        res.send(err);
      });
      Barrack.updateMany({  generatedSoldier : {$lt : 10 }}, { $inc: {  generatedSoldier: 1 }} )
      .then((_) => {})
      .catch((err) => {
        res.send(err);
      });
    },
    {
      schedule: true,
      timezone: "Asia/Jakarta",
    }
  );
  task.start();
});
};

module.exports = connectDB;
