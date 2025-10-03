import { IUser } from "../model/user.model";
import { UserService } from "../service/user.service";
import { Request,Response } from "express";
import { LofinDto as LoginDto } from "../dao/login/login.dto";
import { ERRORS } from "../constants/errors.constants";

export class UserController {
    private userService: UserService;
    constructor(){
        this.userService = UserService.getInstance();
    }

    //regiter
    createUser = async (req: Request, res: Response) => {
        const user = req.body as unknown as IUser;
        if(!user.name || !user.phoneNumber){
            res.status(400).json({message: 'Name and phone number are required'});
            return;
        }

        const createdUser = await this.userService.createUser(user);
        res.status(201).json(this.createUser);
    }

    //login

    login = async (req: Request, res: Response) => {
        const user = req.body as unknown as LoginDto; //{email: string, password: string}

        try{
            const loginUser = await this.userService.login(user);
            res.status(200).json(loginUser);
        }
        catch(error:any){
            if(error.message === ERRORS.USER_NOT_FUND){
                res.status(404).json({message: 'User not found'});
                return;
            }
            else if(error.message === ERRORS.INVALID_PASSWORD){
                res.status(401).json({message: 'Invalid password'});
                return;
            }
            else{
                res.status(500).json({message: 'Internal server error'});
                return;
            }
        }
    }
    hello = async (req: Request, res: Response) => {
        res.status(200).json({message: 'Hello'});
    }
}