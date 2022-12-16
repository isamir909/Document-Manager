const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
const documentSchema = new mongoose.Schema(
  {
    userId: { type: objectId, refs: "user", required: true },
    fileName: { type: String, require: true, trim: true },
    fileSize: { type: Number, trim: true },
    fileLink: { type: String, trim: true, require: true },
    extension: { type: String, trim: true, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("document", documentSchema);
