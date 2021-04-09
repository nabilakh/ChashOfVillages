const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const marketSchema = new Schema(
  {
  name: {
    unique: true,
    type: String,
    required: true,
  },
  generatedGold: {
    type: Number, 
    max: 20,
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

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
