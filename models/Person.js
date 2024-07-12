const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//creating schema of our model
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//password hashing
PersonSchema.pre("save", async function (next) {
  const person = this;

  //Hash the password only if it has been modified(or its new)
  if (!person.isModified("password")) return next();

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    // overwrite plain password with the hash one
    person.password = hashedPassword;
    next(); //next function batata h mongoose ko ki ab db m ja kr save krdo
  } catch (err) {
    return next(err);
  }
});

// making comparePassword function available  for comparing the password in database and user user provided password (through url)
PersonSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provide password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//create person model
const Person = mongoose.model("Person", PersonSchema);
module.exports = Person; //exporting model
