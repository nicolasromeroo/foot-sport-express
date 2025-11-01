import userDao from "../dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";

// POST
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await userDao.getByEmail(email);
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Ya hay un usuario asociado a ese mail, inicie sesión." });

    const hashedPassword = await hashPassword(password);

    const user = await userDao.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    return res
      .status(200)
      .json({ msg: "Usuario retgistrado con éxito.", user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Error al registrar usuario: ", err });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userDao.getByUsername(username);
    console.log(user);

    if (!user) {
      return res.status(403).json({ msg: "Usuario no encontrado." });
    }

    console.log(user.password);

    const match = await comparePassword(password, user.password);
    console.log(match);

    if (!match) {
      return res.status(403).json({ msg: "Usuario o contraseña inválidos." });
    }

    const token = generateToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    return res.status(200).json({ msg: "Iniciaste sesión", user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error al iniciar sesión: ", err });
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = (req.authorization?.split(" ")[1]).remove;
    if (!authHeader) return res.sendStatus(204);

    res.status(200).json({ msg: "Sesión cerrada" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", err });
  }
};

// GET
export const profile = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await userDao.getById(id);

    res.status(200).json({ msg: "Perfil de usuario", user });
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener perfil de usuario: ", err });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await userDao.getAll();
    if (!users)
      return res.status(404).json({ msg: "No se encontraron usuarios." });

    return res.status(200).json({ msg: "Usuarios: ", users });
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener usuarios: ", err });
  }
};

export const byUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userDao.getByUsername(username);
    if (!user)
      return res.status(404).json({ msg: "No se encontró el usuario." });

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener usuarios: ", err });
  }
};

export const byMail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userDao.getByUsername(email);
    if (!user)
      return res.status(404).json({ msg: "No se encontró el usuario." });

    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener usuarios: ", err });
  }
};

// PUT
export const updateUser = async (req, res) => {
  // user id desde el token decodificado en req.user
  const { id: uid } = req.user;
  const { username, email, password } = req.body;

  try {
    // vuelvo a hashear la contra por separado de los demas campos
    let updateData = { username, email };
    if (password) {
      updateData.password = await hashPassword(password);
    }

    const user = await userDao.update(uid, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    return res
      .status(200)
      .json({ msg: "Usuario actualizado con éxito: ", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error al actualizar usuario: ", err });
  }
};

// DELETE
export const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const deletedUser = await userDao.delete(uid);
    return res.status(200).json({ msg: "Usuario eliminado con éxito." });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar usuario: ", err });
  }
};
