import { mongo } from "mongoose";

const favsCollection = "favs"

const favsSchema = new Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    playerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "players",
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams",
        required: true,
    }
});

const Favs = model(favsCollection, favsSchema);

export default Favs;