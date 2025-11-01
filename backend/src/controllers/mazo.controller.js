
import mazoDao from "../dao/mazo.dao.js";
import playerDao from "../dao/player.dao.js";

export const createMazo = async (req, res) => {
    const { playerIds } = req.body;
    const userId = req.user.id;

    if (!playerIds || !Array.isArray(playerIds) || playerIds.length < 5) {
        return res.status(400).json({ msg: "Debes seleccionar al menos 5 cartas" });
    }

    try {
        const mazo = await mazoDao.create({
            user: userId,
            playerIds
        });

        res.status(201).json({ msg: "Mazo creado con éxito", mazo: mazo });
    } catch (err) {
        res.status(500).json({ msg: "Error al crear el mazo", err });
    }
};

export const getMazoByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const mazo = await mazoDao.getByUserId(userId);
        if (!mazo) return res.status(404).json({ msg: "Mazo no encontrado" });

        res.status(200).json({ mazo });
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener el mazo", err });
    }
};

export const updateMazo = async (req, res) => {
    const userId = req.user.id;
    const { playerIds } = req.body;

    if (!playerIds || !Array.isArray(playerIds) || playerIds.length < 5) {
        return res.status(400).json({ msg: "Lista de cartas inválida" });
    }

    try {
        const updatedMazo = await mazoDao.updateByUser(userId, { playerIds });

        res.status(200).json({ msg: "Mazo actualizado", mazo: updatedMazo });
    } catch (err) {
        res.status(500).json({ msg: "Error al actualizar el mazo", err });
    }
};

export const deleteMazo = async (req, res) => {
    const userId = req.user.id

    try {
        await mazoDao.deleteByUser(userId);

        res.status(200).json({ msg: "Mazo eliminado con éxito" });
    } catch (err) {
        res.status(500).json({ msg: "Error al eliminar el mazo", err });
    }
};
