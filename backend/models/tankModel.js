const { Schema, model } = require("mongoose");

const TankSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sideNumber: {
    type: String,
    required: [true, "Please provide side number!"],
  },
  producer: {
    type: String,
    required: [true, "Producer is required!"],
  },
  model: {
    type: String,
    required: [true, "Model is required"],
  },
  currentModification: {
    type: String,
    required: [true, "Current modification is required"],
  },
  vintage: {
    type: Number,
    required: true,
    min: 1900,
  },
  quantityAmmunition: {
    type: Number,
    required: true,
    min: 1,
  },
  dateInCountry: {
    type: Date,
    required: true,
    default: Date.now,
  },
  mileage: {
    type: Number,
    required: true,
    min: 1,
  },
  armor: {
    armorFront: { type: Number, required: true, min: 1 },
    armorBack: { type: Number, required: true, min: 1 },
    armorSide: { type: Number, required: true, min: 1 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Tank", TankSchema);
