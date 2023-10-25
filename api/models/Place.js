const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },
  address: {
    type: String,
    required: [true, "Please enter an address"],
  },
  photos: {
    type: [String],
    required: [true, "Please enter an image URL"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  perks: {
    type: [String],
    required: [true, "Please enter perks"],
  },
  extraInfo: {
    type: String,
  },
  checkIn: {
    type: Number,
    required: [true, "Please enter a check-in time"],
  },
  checkOut: {
    type: Number,
    required: [true, "Please enter a check-out time"],
  },
  maxGuests: {
    type: Number,
    required: [true, "Please enter a maximum number of guests"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
