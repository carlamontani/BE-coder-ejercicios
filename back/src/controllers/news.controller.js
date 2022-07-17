import DAO from '../services/DAOs/newsFactory.js';


export async function getAllNews(req, res) {
  try{
    const allNews = await DAO.getAllNews()
    console.log(allNews)
    if(allNews.status === 200) {
      res.status(200).json({ news: allNews })
    }
  } catch(error) {
    console.log(error)
  }
}

export async function getNews(req, res) {

}

export async function createNews(req, res) {
  const { body } = req
  console.log(body)
  const newNews = await DAO.createNews(body)
  console.log(newNews)
  if(newNews) {
    res.status(200).json({ news: newNews })
  } else {
    res.status(400).send("no funciona")
  }
}
