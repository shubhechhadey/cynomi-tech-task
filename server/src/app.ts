import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes";
import sleepRoutes from "./routes/sleepRoutes";
import { PrismaClient } from "@prisma/client";

export const app: Application = express();
const prisma = new PrismaClient();

async function createServer() {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
 

  app.use("/api", userRoutes);
  app.use("/api", sleepRoutes);

  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
}
createServer();
