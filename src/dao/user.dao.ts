import { IUser, User } from "../model/user.model";

export class UserDao {
    private static instance : UserDao;
    public static getInstance(): UserDao{
        if(!UserDao.instance){
            UserDao.instance = new UserDao();
        }
        return UserDao.instance;
    }

    private constructor() {}

    public async createUser(user:IUser): Promise<IUser>{
        try{
            const newUser = new User(user);
            const createUser =await newUser.save();
            // createdUser.phoneNumber = '';
            // createdUser.save();
            return createUser.toJSON() as IUser;
        }
        catch(error){
            console.log(error);
            console.log(error);
            throw error;
        }
    }
}