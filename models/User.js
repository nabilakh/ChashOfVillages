const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
    
const userSchema = new Schema({
    fullname: {
      type: String,
      required: [true, "Fullname is needed"],
      default: "noname",
      trim: true
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is needed"],
    },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
    },
    password: {
      type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    townhall: {
      gold: { type: Number, default: 100, min: 0, max: 1000 },
      food: { type: Number, default: 100, min: 0, max: 1000 },
      soldier: { type: Number, default: 0, min: 0, max: 500 },
    },
    medal: {
      type: Number,
      default: 0,
    },
    // Building
      market: [{ type: Schema.Types.ObjectId, default: 0, min: 0, max: 1000 }],
      farm: [{ type: Schema.Types.ObjectId, default: 0, min: 0, max: 1000 }],
      barrack: [{ type: Schema.Types.ObjectId, default: 0, min: 0, max: 30 }],

      totalBarrack: {
        barrack: { type: Number, default: 0, min: 0, max: 30 },
      },
  });

  const User = mongoose.model('User', userSchema);

  module.exports = User; 