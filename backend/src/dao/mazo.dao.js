import Mazo from "../models/mazo.model.js";

class MazoDao {
    async getByUserId(userId) {
        const mazo = await Mazo.findOne({ user: userId }).populate("user");
        return mazo;
    }

    async create(data) {
        const mazo = await Mazo.create(data);
        return mazo;
    }

    async updateByUser(userId, updateData) {
        return await Mazo.findOneAndUpdate({ user: userId }, updateData, { new: true });
    }

    async deleteByUser(userId) {
        return await Mazo.findOneAndDelete({ user: userId });
    }
}

const mazoDao = new MazoDao()

export default mazoDao
