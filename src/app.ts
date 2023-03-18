import express, { Application } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { corsOptions } from "./config/middleware";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.middleware();
  }

  private config(): void {
    this.app.use(json());
    this.app.use(cors(corsOptions));
    this.app.use(urlencoded({ extended: true }));
  }

  private middleware(): void {
    this.app.use(errorHandler);
  }

  private routes(): void {
    this.app.use("/api", userRoutes);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

export default new App().app;
