import { APP_CONFIG } from "../config/app.config";
import { GoogleGenAI } from "@google/genai";
import { IMessage } from "../model/message.model";
import { IMessageHistory } from "../dto/messageHistory.dto";

export class GeminiService {

    private geminiApiKey: string;

    private gemini: GoogleGenAI;

    private static instance: GeminiService;
    public static getInstance(): GeminiService{
        if(!GeminiService.instance){
            GeminiService.instance = new GeminiService();
        }
        return GeminiService.instance;
    }
    private constructor(){
        this.geminiApiKey = APP_CONFIG.GEMINI_API_KEY || '';
        this.gemini = new GoogleGenAI({});
    }

    public async generateReply(message: string, history: IMessageHistory[]): Promise<string>{
        try{
            const chat = await this.gemini.chats.create({
                model: "gemini-2.5-flash",
                history: history,
            });
            const response = await chat.sendMessage({
                message: "I have 2 dogs in my house",
            });

            return response.text || 'Cannot generate reply';
        }catch(error){
            console.log(error);
            return 'Cannot generate reply';
        }
        
    }

}