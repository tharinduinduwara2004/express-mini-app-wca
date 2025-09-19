import { Request, response, Response } from "express";
import { WebhookService } from "../service/webhook.service";
import { webhookMessageDto } from "../dto/webhookVerification.dto";

export class WebhookController {

    
    private webhookService: WebhookService;
    
    constructor(){
        this.webhookService = WebhookService.getInstance(); 
    }

    webhook = async (req: Request, res: Response) => {
        const mode = req.query['hub.made'] as string;
        const challenge = req.query['hub.challenge'] as string;
        let verify_token = req. query['hub.verify_token'] as string;

        const data ={
            mode,
            challenge,
            verify_token
        }
        const response = this.webhookService.handleWebhookVerfifcation(data)
        if(response.status){
                res.send(response.challenge);
                return
            }
            
        }

         webhookMessage = async (req: Request, res: Response) => {
            //console.log(JSON.stringify(req.body));
            const data = req.body as webhookMessageDto;

            const message = data.entry[0].changes[0].value.messages[0].text.body;
            const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;

            console.log(phoneNumber + " : "+message);
        }
       
    }

   

