import { IUser } from "../model/user.model";
import { UserService } from "../service/user.controller";
import { Request,Response } from "express";

export class UserController {
    private userService: UserService;
    constructor(){
        this.userService = UserService.getInstance();
    }

    createUser = async (req: Request, res: Response) => {
        const user = req.body as unknown as IUser;
        if(!user.name || !user.phoneNumber){
            res.status(400).json({message: 'Name and phone number are required'});
            return;
        }

        const createdUser = await this.userService.createUser(user);
        res.status(201).json(this.createUser);
    }

    hello = async (req: Request, res: Response) =>{
        res.status(200).json({message: 'Hello'});
    }
}