import New from "../models/news.model.js";

class NewDao {
  async create(data) {
    const noticia = await New.create(data);
    return noticia;
  }

  // TODO: crear una noticia del equipo correspondiente
  async getAll() {
    const noticias = await New.find();
    return noticias;
  }

  async getByTeam(tid) {
    const noticias = await New.findOne({ tid });
    return noticias;
  }
}

const newDao = new NewDao();

export default newDao;
