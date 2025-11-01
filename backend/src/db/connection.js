import mongoose from "mongoose";
import envsConfig from "../config/envs.config.js";

export async function connectingToMongoDB() {
    try {
        await mongoose.connect(envsConfig.MONGO_URL);
        console.log("✅ Servidor express conectado a la base de datos de MongoDB.");
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err)
    }
}
