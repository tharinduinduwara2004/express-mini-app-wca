import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { UserService } from "../service/user.service";
import { IUser, UserType } from "../model/user.model";

export interface AuthRequest extends Request {
    user?: IUser;
}

export class AuthMiddleware {
    private static instance: AuthMiddleware;
    private authService: AuthService;
    private userService: UserService;
    public static getInstance(): AuthMiddleware{
        if(!AuthMiddleware.instance){
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    private constructor(){
        this.authService = AuthService.getInstance();
        this.userService = UserService.getInstance();
    }

    authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message: 'Token is required'});
        }
        //to be implemented
        const decoded = this.authService.verifyToken(token as string);
        const user = await this.userService.getUserById(decoded.id);
        (req as AuthRequest).user = user;
        next();
    }
    
}

//authentication middleware
export function authenticateJWT(required:boolean = true){
    const authService = AuthService.getInstance();
    const userService = UserService.getInstance();
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        try{
            if(!token){
            return res.status(401).json({message: 'Token is required'});
            }
            //to be implemented
            const decoded = authService.verifyToken(token as string);
            const user = await userService.getUserById(decoded.id);
            (req as AuthRequest).user = user;
        }
        catch(error:any){
            if(required){
                return res.status(401).json({message: 'Invalid token'});
            }
        }
        next();
    }
}
export function requiredRole(role: UserType){
    return async (req: Request, res: Response, next: NextFunction)=> {
        const user = (req as AuthRequest).user;
        if(!user){
            return res.status(401).json({message: 'User not authenticated'});
        }
        if(user?.type !== role){
            return res.status(403).json({message: 'Unauthorized'});
        }
        next();
    }
}