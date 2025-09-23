import { Request, Response } from "express";
import { webhookMessageDto, WebhookVerificationDto, WebhookVerificationResponseDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";
import { MessageService } from "./message.service";
import { GeminiService } from "./gemini.service";
export class WebhookService{

    private static instance: WebhookService;
    private messageService:MessageService;
    private geminiService:GeminiService

    public static getInstance(): WebhookService {
        if(!WebhookService.instance){
            WebhookService.instance = new WebhookService();
        }
        return WebhookService.instance;
    }

    private constructor(){
        this.messageService = MessageService.getInstance();
        this.geminiService = GeminiService.getInstance();
    }

    public handleWebhookVerfifcation(data: WebhookVerificationDto ):WebhookVerificationResponseDto{

        const password = APP_CONFIG.WEBHOOK_VERIFICATION_PASSWORD;

        if(data.mode === 'subscribe' && data.verify_token === password){
            return {
                status: true,
                challenge: data.challenge
            }
        }

        return {
            status: false,
            challenge:''
        };

    }

    public async handleReceiveMessage(data: webhookMessageDto):Promise<boolean>{

        //check whether the webhook notify us about the message satus
        //if so we need to stop generating reply again and again
        const status = data.entry[0].changes[0].value.statuses;
        if(status !== undefined && status.length>0){
            console.log('status: ' , status[0].status);
            return true;
        }
        try{
        //extracting message from recived nottification via webhook
        //this should be send to the AI model to genarate a reply
        const message = data.entry[0].changes[0].value.messages[0].text?.body;
        
        if(message === undefined){
            console.log('message is undefined');
            console.log(JSON.stringify(data));
            return true;
        }

        //extracting phone number and name from recieved notification via webhook
        const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
        const name = data.entry[0].changes[0].value.contacts[0].profile.name;

       // const replyMessage = `Hello ${name}, You Message Received`;
       const replyMessage = await this.geminiService.generateReply(message);
        //const repltMessage = await this.aiservice.generateReply(Message);

        const isReplied = await this.messageService.sendMessage(phoneNumber, replyMessage);
        
        if(isReplied){
            return true;
            }
        }    
        catch(error:any){
            console.log(error);
            return true;
        }

        return false;
    }
    

    

}

