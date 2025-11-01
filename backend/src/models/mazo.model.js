import mongoose, { Schema } from "mongoose"

const mazosCollection = "mazos"

const mazoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    playerIds: [
        {
            type: Schema.Types.ObjectId,
            ref: "Player",
            required: true
        }
    ]
})

const Mazo = mongoose.model("Mazo", mazoSchema, mazosCollection)

export default Mazo