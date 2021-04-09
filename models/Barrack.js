const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const barrackSchema = new Schema(
  {
  name: {
    unique: true,
    type: String,
    required: true,
  },
  generatedSoldier: {
    type: Number,
    max: 10,
    default: 0, 
  },
  User_Id: {
    type: mongoose.Types.ObjectId, 
    ref: "User",
    required: true,
  }
},
{
  timestamps: { 
    createdAt: "created_at", updatedAt: "updated_at" 
  },
}
);

const Barrack = mongoose.model("Barrack", barrackSchema);

module.exports = Barrack;
