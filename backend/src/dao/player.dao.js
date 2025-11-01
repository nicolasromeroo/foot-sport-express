import Player from "../models/player.model.js";
import userDao from "./user.dao.js";

class PlayerDao {
  async create(data) {
    const player = await Player.create(data);
    return player;
  }

  async getAll() {
    const players = await Player.find();
    return players;
  }

  async getByUserId(userId) {
    const user = await userDao.getById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    await user.populate("myPlayers");
    return user.myPlayers;
  }

  async getByName(name) {
    const player = await Player.findOne({ name });
    return player;
  }

  async update(pid, data) {
    const player = await Player.findByIdAndUpdate(pid, data, { new: true });
    return player;
  }

  async delete(pid) {
    const player = await Player.findByIdAndDelete(pid);
    return player;
  }
}

const playerDao = new PlayerDao();

export default playerDao;
