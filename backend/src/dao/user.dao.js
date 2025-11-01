import User from "../models/user.model.js";

class UserDao {
  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async getById(id) {
    const user = await User.findById({ _id: id });
    return user;
  }

  async getByUsername(username) {
    const user = await User.findOne({ username });
    return user;
  }

  async getByEmail(email) {
    // usado actualmente en /register -> controller
    const user = await User.findOne({ email });
    return user;
  }

  async update(uid, data) {
    const user = await User.findByIdAndUpdate(uid, data, { new: true });
    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

const userDao = new UserDao();

export default userDao;
