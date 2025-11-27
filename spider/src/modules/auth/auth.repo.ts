import { Inject, Injectable } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { RegistrationDto } from "./dto/register.dto";

@Injectable()
export class AuthRepo{
    collection:string = "users"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}


    async findAll(){
        let res = await this.db.collection(this.collection).find().toArray()
        return res
    }

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

    async readById(id: string){
        let uid = new ObjectId(id)
        let res = await this.db.collection(this.collection).findOne(
            {_id:uid}
        )
        return res
    }

    async update(id: string, key: string, val: string){
        let res = this.db.collection(this.collection).updateOne(
            {
              _id: new ObjectId(id)
            },
            {
               $set:{
                  [key]:val
               }
            }
        )
        return res
    }

    async delete(id: string) {
        const blogs_to_delete = await this.db.collection("blogs")
            .aggregate([
                { $match: { author_id: new ObjectId(id) } },
                { $project: { _id: 1 } }
            ])
            .toArray();

        const blogIds = blogs_to_delete.map(doc => doc._id);

        const res = await this.db.collection("blogs").deleteMany({
            _id: { $in: blogIds }
        });
        
        let urs_del = await this.db.collection(this.collection).deleteOne(new ObjectId(id))
        return urs_del;
    }

}