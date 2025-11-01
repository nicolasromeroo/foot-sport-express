import mongoose, { Schema } from "mongoose"

const playersCollection = "players"


const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    rarity: {
        type: String,
        enum: ["common", "rare", "legendary"],
        required: true,
    },
    stats: {
        rating: {
            type: Number,
            required: true
        },
        vision: {
            type: Number,
            required: true
        },
        dribble: {
            type: Number,
            required: true
        },
        pass: {
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        },
        defense: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            required: true
        }
    },
    image: {
        type: String,
        required: true,
    },
});


const Player = mongoose.model("Player", playerSchema, playersCollection)

export default Player