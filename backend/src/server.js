import express from "express";
import { connectingToMongoDB } from "./db/connection.js";
import cors from "cors";
import envsConfig from "./config/envs.config.js";

import authRoutes from "./routes/auth.routes.js";
import playersRoutes from "./routes/players.routes.js";
import packsRoutes from "./routes/packs.routes.js";
import mazosRoutes from "./routes/mazo.routes.js";

import http from "http";
import { Server } from "socket.io";
import { setupPvpSocket } from "./socket/pvp.js";

// documentacion con swagger
import { swaggerSpec, swaggerUi } from "./config/swagger.config.js";

const app = express();
connectingToMongoDB();

// sockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupPvpSocket(io);

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/packs", packsRoutes);
app.use("/api/mazos", mazosRoutes);

// swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(envsConfig.PORT, () => {
  console.log("✅ Servidor express corriendo.");
});
