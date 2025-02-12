import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";
import { authenticate } from "./middleware/authentication";
import { errorHandler, notFound } from "./middleware/errorHandling";
import { sequelize } from "./utils/database";
import { port } from "./utils/config";
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/files", [authenticate, fileRoutes]);

// Error handling middleware
app.use(errorHandler);
app.use(notFound);

const start = async () => {
  try {
    // Database connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Start the server
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

start();
