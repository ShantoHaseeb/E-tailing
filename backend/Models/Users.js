const { Schema, mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "required"],
    },
    email: {
      type: String,
      required: [true, "required"],
      unique: true,
      index: true,
    },
    pass: {
      type: String,
      required: [true, "required"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Object,
      default: {
        total: 0,
        count: 0,
      },
    },
  },
  { minimize: false }
);

UserSchema.statics.credentials = async function (email, pass) {
  const user = await Users.findOne({ email });
  if (!user) throw new Error("invalid");
  const samePass = bcrypt.compareSync(pass, user.pass);
  if (samePass) return user;
  throw new Error("invalid");
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.pass;
  return userObject;
};

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("pass")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.pass, salt, function (err, hash) {
      if (err) return next(err);

      user.pass = hash;
      next();
    });
  });
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
