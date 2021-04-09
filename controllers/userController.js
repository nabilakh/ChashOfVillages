const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {

    // Register Player
    static register (req, res) {
      
        User.create({
          fullname: req.body.fullname,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          phoneNumber: req.body.phoneNumber,
        })
          .then((result) => {
            res
              .status(201)
              .json({ message: "REGISTER BERHASIL", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "REGISTER GAGAL", data: err });
          });
    }

    // Menampilkan Resource
  static townhall(req, res, next) {
    User.findById(req.UserId)
      .then((result) => {
        res.status(200).json({
          result, data:User
        });
      })
      .catch(next);
  }

    // Menampilkan semua data user
    static findAllUser  (req, res) {
      User.find()
        .then((result) => {
          if (result.length > 0) {
            res
              .status(200)
              .json({ message: "Berhasil find all data User", data: result });
          } else {
            res.status(404).json({ message: "not found all data User" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Gagal find all data User" });
        });
  }

  // Mengupdate data User
  static updateUser  (req, res)  {
    const { id } = req.params;
    const { fullname, email, phoneNumber } = req.body;
  
    const updatedData = { fullname, email, phoneNumber };
  
    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }
  
    User.findByIdAndUpdate(id, updatedData, { new: true })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Berhasil update data User", data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: "Gagal update data User", data: err });
      });
}

// Menghapus data User
static deleteUser (req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then((result) => {
      res
        .status(200)
        .json({ message: "Data User berhasil dihapus", data: result });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Data User gagal dihapus", data: err });
    });
}

    // Login Player
    static login (req,res) {
      User.findOne({email:req.body.email})
      .then((result)=>{
          if(!result){
              return res.status(401).json({success:false, message:"Kombinasi email dan password tidak ditemukan"})
          }
          let passwordIsValid = bcrypt.compareSync(req.body.password, result.password)
          if(!passwordIsValid){
              return res.status(401).json({success:false, message:"Kombinasi email dan password tidak ditemukan"})
          }
          let token = jwt.sign({id: result.id}, process.env.secretKey, { expiresIn: '1h' })
          res.status(200).json({message:"Berhasil Login", data:result, AccessToken: token})
      })
      .catch((err) => {
          res.status(500).json({ message: "Gagal Login", err });
      })
  }
  }     


module.exports = userController;