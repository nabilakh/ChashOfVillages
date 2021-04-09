const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const farmSchema = new Schema(
  {
  name: {
    unique: true,
    type: String,
    required: true,
  },
  generatedFood: {
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

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
