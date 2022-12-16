const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true, trim: true },
    phone: { type: String, require: true, trim: true },
    profilePicture: { type: String, require: false, trim: true },
    isPremiumUser: { type: Boolean, default: false },
    availableStorage: { type: Number, default: 1024 }, //in kilobytes(kb)
    totalStorageCapacity: { type: Number, default: 1024 }, //in kilobytes(kb)
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
