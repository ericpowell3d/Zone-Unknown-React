const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  sav: { type: String, required: true },
});

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre("save", function (next) {
  if (!this.password) {
    console.log("=======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("=======PASSWORD HASHED=======");

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
