const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema(
  {
    reason: String,
    dueDate: Date,
    value: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Debt", DebtSchema);