const Market = require("../models/Market");
const User = require("../models/User");



class MarketController {

  // Create Market
  static createMarket(req, res, next) {
    User.findById(req.UserId)
      .then((user) => {
        if (user) {
          if (user.townhall.gold >= 30 && user.townhall.food >= 10) {
            const townhall = user.townhall;
            townhall.gold -= 30;
            townhall.food -= 10;
            return User.updateOne(
              { _id: user._id }, { townhall }
            );
          } else {
            throw ({ name: "Not_Enough" });
          }
        } else {
          throw ({ name: "Not_Found" });;
        }
      })
      .then((_) => {
        const { name } = req.body;
        const market = new Market({
          User_Id: req.UserId,
          name,
        });
        return market.save();
      })
      .then((result) =>{
        User.findByIdAndUpdate(
          req.UserId, 
          { $push: { market: result._id} },
          { new: true} 
          )
          .then((_) =>{})
          .catch((err) => {  

          });
        res
        .status(201)
        .json({ success: true, message:"Success create market !", data:result});
      })
      .catch(next);
     }

    // Menampilkan semua data Market
    static findAllMarket  (req, res) {
      Market.find(
        { User_Id: req.UserId }
      )
        .then((result) => {
          if (result.length > 0) {
            res
              .status(200)
              .json({ message: "Berhasil find all data Market", data: result });
          } else {
            res.status(404).json({ message: "not found all data Market" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Gagal find all data Market" });
        });
  }

      // Menampilkan Resource
      static ById(req, res, next) {
        Market.findOne({ _id: req.params.id })
          .then((market) => {
            res.status(200).json({ data: market });
          })
          .catch(next);
      }
 
      // Mengganti nama market 
      static updateMarket  (req, res)  {
        const { id } = req.params;
        const { name } = req.body;
      
        const updatedData = { name };
      
        for (const key in updatedData) {
          if (!updatedData[key]) {
            delete updatedData[key];
          }
        }
      
        Market.findByIdAndUpdate(id, updatedData, { new: true })
          .then((result) => {
            res
              .status(200)
              .json({ message: "Berhasil mengganti nama Market", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "Gagal mengganti nama Market", data: err });
          });
    }

    // Menghapus data Market
    static deleteMarket(req, res, next) {
      const { id } = req.params;
      Market.findByIdAndDelete(id)
        .then((result) =>{
          User.findByIdAndUpdate(
            req.UserId,  
            { $pull: { market: result._id} },
            { new: true} 
            )
            .then((_) =>{})
            .catch((err) => {
            });
          res
          .status(201)
          .json({ success: true, message:"Success delete market !", data:result});
        })
        .catch(next);
       }

      //  Collect gold market
      static collectGold(req, res, next) {
        Market.findOne({ _id: req.params.id })
          .then((market) => {
            const id = market.User_Id;
            User.findById(id)
              .then((user) => {
                const townhall = user.townhall;
                if(townhall.gold >= 1000){
                  townhall.gold = 1000;
                }else{
                  townhall.gold += market.generatedGold;
                }
                return User.findOneAndUpdate({ _id: user._id }, { townhall });
              })
              .then((_) => {
                market.generatedGold = 0;
                return Market.updateOne(
                  { _id: market._id },
                  { $set: { generatedGold: 0 } }
                );
              })
              .then((_) => {
                res.status(200).json({ message: "Collect gold from Market Success !!!", data: market });
              })
              .catch(next);
          })
      }
      }

    
  


module.exports = MarketController;