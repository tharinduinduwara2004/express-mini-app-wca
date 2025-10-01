import mongoose from "mongoose";

export enum Role {
    USER = 'user',
    MODEL = 'model'
}

export interface IMessage {
    _id?: string;
    userID: string;
    role: Role;
    content: string;
    createdAt?: Date;
    updateAt?: Date;
}

export const MessageSchema = new mongoose.Schema(
    {
        userId: { type: String, reqired: true},
        role: { type: String, enum:Object.values(Role), reqired: true},
        content: { type: String, reqired: true},
    },
    {
        timestamps: true
    }
);

export const Message = mongoose.model<IMessage>('Message', MessageSchema);