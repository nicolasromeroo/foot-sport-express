import mongoose, { Schema } from "mongoose";

const usersCollection = "users";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  myPlayers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  myTeam: {
    type: Schema.Types.ObjectId,
    ref: "team",
  },
  pts: {
    type: Number,
    default: 500, // ejemplo inicial
  },
  lastFreePack: {
    type: Date, // para saber si ya abrió el sobre común
  },
});

const User = mongoose.model("User", userSchema, usersCollection);

export default User;
