const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 255 },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

//function to validate user
// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(3).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(3).max(255).required(),
//   };

//   return Joi.validate(user, schema);
// }

module.exports = User;
// module.export = validateUser;
