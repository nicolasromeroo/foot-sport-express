import mongoose, { Schema } from "mongoose"

const newsCollection = "news"

const newSchema = new Schema({
    title: {
        type: String
    },
    desription: {
        type: String
    },
    category: {
        type: String
    },
    date: {
        type: Date
    },
    img: {
        type: String
    }
})

const New = mongoose.model("New", newSchema, newsCollection)

export default New