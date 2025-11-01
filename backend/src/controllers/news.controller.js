import newDao from "../dao/news.dao";

export const addNew = async (req, res) => {
  const { title, description, category, date, img } = req.body;
  try {
    const nuevaNoticia = await newDao.create({
      title,
      description,
      category,
      date,
      img,
    });

    return res.status(200).json({ msg: "Noticia agregada: ", nuevaNoticia });
  } catch (err) {
    return res.status(500).json({ msg: "Error al agregar noticia.", err });
  }
};

export const getNews = async (req, res) => {
  try {
    const noticias = await newDao.getAll();
    return res.status(200).json(noticias);
  } catch (err) {
    return res.status(500).json({ msg: "Error al agregar noticia.", err });
  }
};

export const getMyFavNew = async (req, res) => {
  const { currentUser } = req.user;
  
  try {
    
  }
};

export const updateNew = async (req, res) => {};
