import { Schema, model } from "mongoose";

const teamCollection = "teams";

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  born: {
    type: Date,
    required: true,
  },
  players: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "players",
      },
    ],
    default: [],
  },
});

const Team = model(teamCollection, teamSchema);

export default Team;
