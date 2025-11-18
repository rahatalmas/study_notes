import { InsertUser, User, UserBodyReq } from "../models/user.model";

export const createUser = (data: UserBodyReq):InsertUser =>{
     const timestamp = new Date().toISOString();
     const user:InsertUser = {
        ...data,
        created_at:timestamp,
        updated_at:timestamp
     }
     return user;
}