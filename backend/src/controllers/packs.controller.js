import userDao from "../dao/user.dao.js";
import Player from "../models/player.model.js";

const PACKS = {
    free: { cost: 0, rarityChances: { common: 0.9, rare: 0.1, legendary: 0 } },
    gold: { cost: 150, rarityChances: { common: 0.6, rare: 0.35, legendary: 0.05 } },
    premium: { cost: 300, rarityChances: { common: 0.4, rare: 0.45, legendary: 0.15 } },
    elite: { cost: 500, rarityChances: { common: 0.2, rare: 0.4, legendary: 0.4 } },
    legendary: { cost: 1000, rarityChances: { common: 0, rare: 0.3, legendary: 0.7 } }
};

export const updatePoints = async (userId, amount, reason = "") => {
    const user = await userDao.getById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    user.points += amount;
    await user.save();

    // opcional: guardar historial de puntos
    // user.history.push({ reason, amount, date: new Date() });

    return user.points;
};

function getRandomRarity(chances) {
    const rand = Math.random();
    let total = 0;

    for (const rarity in chances) {
        total += chances[rarity];
        if (rand < total) return rarity;
    }
    return "common";
}

export const openPack = async (req, res) => {
    const { type } = req.params;
    const user = await userDao.getById(req.user.id);
    const packType = PACKS[type];

    if (!packType) return res.status(400).json({ error: "Tipo de sobre inválido" });

    if (type === "free") {
        const now = Date.now();
        const diff = now - new Date(user.lastFreePack || 0).getTime();
        if (diff < 24 * 60 * 60 * 1000) {
            return res.status(403).json({ error: "Sobre gratis disponible cada 24 horas" });
        }
        user.lastFreePack = new Date();
    } else {
        if (user.points < packType.cost) {
            return res.status(400).json({ error: "No tenés puntos suficientes." });
        }
        user.points -= packType.cost;
    }

    const selected = [];

    for (let i = 0; i < 5; i++) {
        const rarity = getRandomRarity(packType.rarityChances);
        const pool = await Player.find({ rarity: rarity });

        if (pool.length === 0) continue;

        const card = pool[Math.floor(Math.random() * pool.length)];
        selected.push(card);
        user.myPlayers.push(card._id);
    }

    await user.save();

    res.status(200).json({
        msg: "Pack abierto correctamente.",
        pack: selected,
        remainingPoints: user.points
    });
};
