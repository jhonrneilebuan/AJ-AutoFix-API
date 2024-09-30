const mongoose = require("mongoose");
const User = require("./user.model")

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (value) {
        return User.exists({ _id: value });
      },
      message: "User not found",
    },
  },
  serviceType: {
    type: [String],
    required: true,
    enum: [
      "Power Window Motor",
      "Power Window Cable",
      "Powerlock 1pc",
      "Powerlock Set",
      "Door Lock",
      "Handle Replacement",
      "Door Lock Repair",
      "Handle Repair",
      "Coolant Flush",
      "Engine Change Oil",
      "Spark Plug",
      "Air Filter",
      "Fuel Injector Cleaning",
      "Timing Belt",
      "Tire Replacement",
      "Wheel Alignment",
      "Brake Pad Set",
      "Brake Fluid",
      "Alternator Repair",
      "Fuse Replacement",
      "Car Alarm",
      "Battery Replacement",
      "HeadLight Bulb",
      "Power Window Switch"
    ],
  },
  vehicleType: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;