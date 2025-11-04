import express from "express";
import { MessageController } from "./controller/message.controller";
import { WebhookController } from "./controller/webhook.controller";
import mongoose from "mongoose";
import { APP_CONFIG } from "./config/app.config";
import { UserController } from "./controller/user.controller";
import { MessageRouter } from "./routes/message.router";
import { UserRouter } from "./routes/user.route";
import { WebhookRouter } from "./routes/webhook.router";
import { AuthRouter } from "./routes/auth.routes";

const app = express();
app.use(express.json());

const webhookRouter = WebhookRouter.getInstance ();
const messagesRouter = MessageRouter.getInstance();
const userRouter = UserRouter.getInstance ();
const authRouter = AuthRouter.getInstance ();

//app.post("/send-message", messageController.sendMessage);

app.use("/webhook", webhookRouter.getRouter());
app.use("/user", userRouter.getRouter());
app.use("/message", messagesRouter.getRouter());
app.use("/auth", authRouter.getRouter());

app.get('/helth',(req,res)=>{
  res.send('OK');
});

mongoose.connect(APP_CONFIG.MONGO_URI).then((mongoose)=>{
  const models = mongoose.modelNames();
  for (const model of models){
    mongoose.model(model).createIndexes();
    console.log(`Created indexes for ${model}`);
    mongoose.model(model).ensureIndexes();
    mongoose.model(model).createCollection();
  }
  console.log('Connected to MongoDB');
  app.listen(8558,() => {
    console.log("Server is running on port 8558");
  });
}).catch((err)=>{
  console.log(err);
});

//app.listen(8558, () => {
//  console.log("Server is running on port 8558");
//});