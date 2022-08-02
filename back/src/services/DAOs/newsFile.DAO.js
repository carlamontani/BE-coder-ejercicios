import { NewsBase } from "./newsBase.DAO.js";
import fs from "fs";
import { uuid } from "uuidv4";
import winston from "winston"

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "verbose" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
  ],
});

export class NewsFile extends NewsBase {
  constructor() {
    super();
    this.news = [];
  }

  async getAllNews() {
    try {
      if (fs.existsSync("news.json")) {
        logger.log("info", "Traigo noticias");
        const news = JSON.parse(fs.readFileSync("news.json", "utf8"));
        this.news = news.news;
      } else {
        fs.writeFileSync("news.json", JSON.stringify({ news: [] }));
      }
      return this.news;
    } catch (error) {
      logger.error(`Error`);
      console.log(error);
    }
  }

  async getNews(id) {
    await this.getAllNews();
    const news = this.news.find((news) => news.id === id);
    return news;
  }

  async createNews(news) {
    news.id = uuid();
    news.createdAt = Date.now();
    await this.getAllNews();
    this.news.push(news);
    fs.writeFileSync("news.json", JSON.stringify({ news: this.news }));
    return news;
  }
}