import express from "express";
import axios from "axios";
import { APP_CONFIG } from "./config/app.config";
import { MessageController } from "./controller/message.controller";

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERSION = process.env.VERSION;
const WHATSAPP_USER_ACCESS_TOKEN = process.env.WHATSAPP_USER_ACCESS_TOKEN;

const app = express();
app.use(express.json());

const messageController = new MessageController();

app.post("/send-message", messageController.sendMessage);

app.listen(8558, () => {
  console.log("Server is running on port 8558");
});