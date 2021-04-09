const Farm = require("../models/Farm");
const User = require("../models/User");



class FarmController {

// Create Farm
static createFarm(req, res, next) {
    User.findById(req.UserId)
      .then((user) => {
        if (user) {
          if (user.townhall.gold >= 10 && user.townhall.food >= 30) {
            const townhall = user.townhall;
            townhall.gold -= 10;
            townhall.food -= 30;
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
        const farm = new Farm({
          User_Id: req.UserId,
          name,
        });
        return farm.save();
      })
      .then((result) =>{
        User.findByIdAndUpdate(
          req.UserId, 
          { $push: { farm: result._id} },
          { new: true} 
          )
          .then((_) =>{})
          .catch((err) => {  

          });
        res
        .status(201)
        .json({ success: true, message:"Success create Farm !", data:result});
      })
      .catch(next);
     }

    // Menampilkan semua data Farm
    static findAllFarm  (req, res) {
      Farm.find(
        { User_Id: req.UserId }
      )
        .then((result) => {
          if (result.length > 0) {
            res
              .status(200)
              .json({ message: "Berhasil find all data Farm", data: result });
          } else {
            res.status(404).json({ message: "Not found all data Farm" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Gagal find all data Farm" });
        });
  }

      // Menampilkan Resource
      static ById(req, res, next) {
        Farm.findOne({ _id: req.params.id })
          .then((farm) => {
            res.status(200).json({ data: farm });
          })
          .catch(next);
      }
 
      // Mengganti nama Farm 
      static updateFarm  (req, res)  {
        const { id } = req.params;
        const { name } = req.body;
      
        const updatedData = { name };
      
        for (const key in updatedData) {
          if (!updatedData[key]) {
            delete updatedData[key];
          }
        }
      
        Farm.findByIdAndUpdate(id, updatedData, { new: true })
          .then((result) => {
            res
              .status(200)
              .json({ message: "Berhasil mengganti nama Farm", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "Gagal mengganti nama Farm", data: err });
          });
    }

    // Menghapus data Farm
    static deleteFarm(req, res, next) {
      const { id } = req.params;
      Farm.findByIdAndDelete(id)
        .then((result) =>{
          User.findByIdAndUpdate(
            req.UserId,  
            { $pull: { farm: result._id} },
            { new: true} 
            )
            .then((_) =>{})
            .catch((err) => {
            });
          res
          .status(201)
          .json({ success: true, message:"Success delete Farm !", data:result});
        })
        .catch(next);
       }

      //  Collect food Farm
      static collectFood(req, res, next) {
        Farm.findOne({ _id: req.params.id })
          .then((farm) => {
            const id = farm.User_Id; 
            User.findById(id)
              .then((user) => {
                const townhall = user.townhall;
                if(townhall.food >= 1000){
                  townhall.food = 1000; 
                }else{
                  townhall.food += farm. generatedFood;
                }
                return User.findOneAndUpdate({ _id: user._id }, { townhall });
              })
              .then((_) => {
                farm. generatedFood = 0;
                return Farm.updateOne(
                  { _id: farm._id },
                  { $set: {  generatedFood: 0 } }
                );
              })
              .then((_) => {
                res.status(200).json({ message: "Collect food from Farm Success !!!", data: farm });
              })
              .catch(next);
          })
      } 
      }

    
  


module.exports = FarmController;