const User = require("../models/User");

class invadeController {
  static randomInvade(ourInvade, enemyDefender) {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(Math.random() < ourInvade / (enemyDefender + 1));
    }
    return arr.filter((el) => el).length >= 2 ? true : false;
  }
  static invade(req, res, next) {
    let user1;
    let user2;
    let isSuccess;
    const enemyId = req.params.id;
    const ourInvade = req.body.soldier;
    User.findById(req.UserId)
      .then((user) => {
        if (user) {
            user1 = user;
          return User.findById({ _id: enemyId });
        } else {
          throw "Not_Found_User";
        }
      })
      .then((user) => {
        if (user) {
              user2 = user;
          if (user1.townhall.soldier >= ourInvade) {
            const townhall = user1.townhall;
            townhall.soldier = user1.townhall.soldier - ourInvade;
            return User.findOneAndUpdate({ _id: user1._id }, { townhall }); 
          } else {
            throw {name: "Not_Enough"};
          }
        } else {
          throw {name: "Not_Found_User"};
        }
      })
      .then((_) => {
        isSuccess = invadeController.randomInvade(
          ourInvade,
          user2.townhall.soldier
        );
        if(user2.townhall.soldier >= 50){
          if (isSuccess) {
            // user1 menang
            const newMedal = user1.medal + 5;
            const townhall = user1.townhall;
            townhall.gold =
              townhall.gold + Math.floor(user2.townhall.gold / 2);
            townhall.food =
              townhall.food + Math.floor(user2.townhall.food / 2);
            return User.findOneAndUpdate(
              { _id: user1._id },
              { medal: newMedal, townhall }
            );
          } else {
            // user1 kalah
            const newMedal = Math.floor(user1.medal / 2);
            return User.findOneAndUpdate(
              { _id: user1._id },
              { medal: newMedal }
            );
          }
        }else throw {name: "Phohibited"}
      })
      .then((_) => {
        if (!isSuccess) {
          // user2 menang
          return User.findOneAndUpdate(
            { _id: user2._id },
            { medal: user2.medal + 2 }
          );
        } else {
          // user2 kalah
          const townhall = user2.townhall;
          townhall.food = Math.ceil(user2.townhall.food / 2);
          townhall.gold = Math.ceil(user2.townhall.gold / 2);
          townhall.soldier = 0;
          return User.findOneAndUpdate({ _id: user2._id }, { townhall });
        }
      })
      .then((_) => {
        res.status(200).json({
          success: true,
          message: `Invade ${isSuccess ? "Success" : "Fail"}`,
        });
      })
      .catch(next);
  }
}

module.exports = invadeController;


