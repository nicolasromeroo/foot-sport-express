import playerDao from "../dao/player.dao.js";

export const allPlayers = async (req, res) => {
  try {
    const players = await playerDao.getAll();
    return res.status(200).json({ players });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error al renderizar las cartas.", err });
  }
};

export const myPlayers = async (req, res) => {
  const userId = req.user.id;

  try {
    const myPlayers = await playerDao.getByUserId(userId);
    return res.status(200).json({ players: myPlayers });
  } catch (err) {
    console.error("Error en myPlayers:", err);
    return res.status(500).json({
      msg: "Error al obtener jugadores del usuario",
      error: err.message,
    });
  }
};

export const createPlayer = async (req, res) => {
  const { name, team, position, nationality, rarity, stats, image } = req.body;

  try {
    if (!name || !team || !position || !nationality || !rarity || !stats) {
      return res.status(400).json({ msg: "Faltan campos obligatorios." });
    }

    const newPlayer = await playerDao.create({
      name,
      team,
      position,
      nationality,
      rarity,
      stats,
      image,
    });

    return res
      .status(201)
      .json({ msg: "Jugador creado con éxito.", player: newPlayer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error al crear jugador.", err });
  }
};

export const updatePlayer = async (req, res) => {
  const { pid } = req.params;
  const { name, team, position, rarity, stats, image } = req.body;

  try {
    const updatedPlayer = await playerDao.update(pid, {
      name,
      team,
      position,
      rarity,
      stats,
      image,
    });

    if (!updatedPlayer)
      return res.status(404).json({ msg: "No se pudo actualizar el jugador." });

    return res
      .status(200)
      .json({ msg: "Jugador actualizado con éxito: ", updatedPlayer });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Error interno del servidor al actualizar jugador." });
  }
};

export const deletePlayer = async (req, res) => {
  const { pid } = req.params;

  try {
    const deletedPlayer = await playerDao.delete(pid);

    if (!deletedPlayer)
      return res.status(404).json({ msg: "No se pudo eliminar el jugador." });

    return res.status(200).json({ msg: "Jugador eliminado con éxito: " });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor al actualizar jugador." });
  }
};
