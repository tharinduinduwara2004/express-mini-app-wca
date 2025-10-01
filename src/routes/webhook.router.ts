import { Router } from "express";
import { WebhookController } from "../controller/webhook.controller";

//webhook
export class WebhookRouter {
    private router: Router;
    private constructor(){
        this.router = Router();
        this.webhookController = new WebhookController();
    }

    private static instance: WebhookRouter;
    private webhookController: WebhookController;
    public static getInstance(): WebhookRouter{
        if(!WebhookRouter.instance){
            WebhookRouter.instance = new WebhookRouter();
        }
        return WebhookRouter.instance;
    }

    public initRoutes(){
        this.router.get("/", this.webhookController.webhook);
        this.router.post("/", this.webhookController.webhookMessage);
    }

    public getRouter(): Router {
        return this.router;
    }
}