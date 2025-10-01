import { Router } from "express";
import { UserController } from "../controller/user.controller";

//user
export class UserRouter {
    private router : Router;
    private static instance: UserRouter;
    private userController: UserController;
    public static getInstance(): UserRouter{
        if(!UserRouter.instance){
            UserRouter.instance = new UserRouter();
        }
        return UserRouter.instance;
    }

    constructor(){
        this.router = Router();
        this.userController = new UserController();
    }

    public initRoutes(){
        //localhost:{port}/user/ - POST
        this.router.post("/", this.userController.createUser);
        //localhost:{port}/user/ - GET
        //this.router.get("/", this.userController.getUser);
        //localhost:{port}/user/hello - POST
        this.router.post("/hello", this.userController.hello);
    }

    public getRouter(): Router{
        return this.router;
    }
}