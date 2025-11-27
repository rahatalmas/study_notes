import { Inject, Injectable } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { RegistrationDto } from "./dto/register.dto";

@Injectable()
export class AuthRepo{
    collection:string = "users"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}

    async findByEmail(email: string){
        let res = await this.db.collection(this.collection).findOne(
            {email:email}
        )
        return res
    }

    async create(data: RegistrationDto){
        let res = await this.db.collection(this.collection).insertOne({
            ...data
        })
        return res
    }

}