import { ObjectId } from "mongodb";

export interface User{
    _id: ObjectId
    fname: string;
    lname: string;
    email: string;
    phone: string;
    password: string;
    userType: string;
    status: string;
    updated_at: string;
    created_at: string;
}

export type UserBodyReq = Omit<User, "_id" | "updated_at" | "created_at">
export type InsertUser = Omit<User, "_id">
export type UpdateUser = Partial<UserBodyReq>