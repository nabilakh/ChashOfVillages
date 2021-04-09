const Barrack = require("../models/Barrack");
const User = require("../models/User");



class BarrackController {

  // Create Barrack
  static createBarrack(req, res, next) {
    User.findById(req.UserId)
      .then((user) => {
        const totalBarrack = user.totalBarrack;
        const townhall = user.townhall;
        if (user) {
          if (townhall.gold >= 30 && townhall.food >= 30) {
            if (totalBarrack.barrack < 30) {
              return User.findOneAndUpdate(
                { _id: req.UserId },
                {
                  townhall: {
                    ...townhall,
                    gold: (townhall.gold -= 30),
                    foods: (townhall.food -= 30),
                  },
                  totalBarrack: {
                    ...totalBarrack,
                    barrack: (totalBarrack.barrack += 1),
                  },
                }
              );
            } else throw { name: "Max_Barrack" };
          } else throw { name: "Not_Enough" };
        } else throw { name: "Not_Found" };
      })
      .then((_) => {
        const { name } = req.body;
        const barrack = new Barrack({
          User_Id: req.UserId,
          name,
        });
        return barrack.save();
      })
      .then((result) =>{
        User.findByIdAndUpdate(
          req.UserId, 
          { $push: { barrack: result._id} },
          { new: true} 
          )
          .then((_) =>{})
          .catch((err) => {  

          });
        res
        .status(201)
        .json({ success: true, message:"Success create Barrack !", data:result});
      })
      .catch(next);
     }

     // Menampilkan semua data Barrack
    static findAllBarrack (req, res) {
      Barrack.find(
        { User_Id: req.UserId }
      )
        .then((result) => {
          if (result.length > 0) {
            res
              .status(200)
              .json({ message: "Berhasil find all data Barrack", data: result });
          } else {
            res.status(404).json({ message: "not found all data Barrack" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Gagal find all data Barrack" });
        });
  }

      // Menampilkan Resource
      static ById(req, res, next) {
        Barrack.findOne({ _id: req.params.id })
          .then((barrack) => {
            res.status(200).json({ data: barrack });
          })
          .catch(next);
      }
 
      // Mengganti nama Barrack
      static updateBarrack (req, res)  {
        const { id } = req.params;
        const { name } = req.body;
      
        const updatedData = { name };
      
        for (const key in updatedData) {
          if (!updatedData[key]) {
            delete updatedData[key];
          }
        }
      
        Barrack.findByIdAndUpdate(id, updatedData, { new: true })
          .then((result) => {
            res
              .status(200)
              .json({ message: "Berhasil mengganti nama Barrack", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "Gagal mengganti nama Barrack", data: err });
          });
    }

    // Menghapus data Barrack
    static deleteBarrack(req, res, next) {
      const { id } = req.params;
      Barrack.findByIdAndDelete(id)
        .then((result) =>{
          User.findByIdAndUpdate(
            req.UserId,  
            { $pull: { barrack: result._id} },
            { new: true} 
            )
            .then((_) =>{})
            .catch((err) => {
            });
          res
          .status(201)
          .json({ success: true, message:"Success delete Barrack !", data:result});
        })
        .catch(next);
       }

      //  Collect gold Barrack
      static collectSoldier(req, res, next) {
        Barrack.findOne({ _id: req.params.id })
          .then((barrack) => {
            const id = barrack.User_Id;
            User.findById(id)
              .then((user) => {
                const townhall = user.townhall;
                if(townhall.soldier >= 500){
                  townhall.soldier = 500;
                }else{
                  townhall.soldier += barrack.generatedSoldier;
                }
                return User.findOneAndUpdate({ _id: user._id }, { townhall });
              })
              .then((_) => {
                barrack.generatedSoldier = 0;
                return Barrack.updateOne(
                  { _id: barrack._id },
                  { $set: { generatedSoldier: 0 } }
                );
              })
              .then((_) => {
                res.status(200).json({ message: "Collect Soldier from barrack Success !!!", data: barrack });
              })
              .catch(next);
          })
      }
      }

    
  


module.exports = BarrackController;