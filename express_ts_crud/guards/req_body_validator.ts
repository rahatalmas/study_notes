import type { UserBodyReq } from "../models/user.model";

export function req_body_validator(obj: any): obj is UserBodyReq{
     return (
        typeof obj === "object" 
        &&
        typeof obj.fname === "string"
        && 
        typeof obj.lname === "string"
        && 
        typeof obj.password === "string"
        && 
        obj.password.length >= 6 
    );
}
