import { Inject, Injectable } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import {UpdateUserDto} from "./dto/user.dto";
import { MongoIdValidator } from "../../common/utils/mongo.util";

@Injectable()
export class UsersRepo{
    collection:string = "users"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}

    //this method finds all the users from the collection
    async findAll(){
        let res = await this.db.collection(this.collection).find({password:0}).toArray()
        return res
    }

    //this method find a specific user matched with the given id
    async finfById(id: string){
        let uid = MongoIdValidator(id)
        let res = await this.db.collection(this.collection).findOne(
            {_id:uid}
        )
        return res
    }

    //this method updates a specific user matched with given id
    async update(id: string, data: UpdateUserDto) {
    const updateOp: any = {};

    //adding skills
    if (data.skills) {
        updateOp.$addToSet = { skills: { $each: data.skills } };
    }

    //adding experience 
    if (data.experience) {
        updateOp.$addToSet = {
        ...updateOp.$addToSet,
        experience: { $each: data.experience }
        };
    }

    //destructuring other values
    const { skills, experience, ...rest } = data;
    if (Object.keys(rest).length > 0) {
        updateOp.$set = rest;
    }

    //update query
    return await this.db.collection(this.collection)
        .updateOne({ _id: new ObjectId(id) }, updateOp);
    }

    //this method removes a skill from a user
    async removeSkill(id:string, skillName: string){
        let userId = MongoIdValidator(id)
        let res = this.db.collection(this.collection).updateOne(
            {_id:userId},
            {$pull:{skills:skillName}as any}
        )
        return res
    }

    //this method removes a experience from a user 
    async removeExperiece(id:string,experienceName: string){
        let userId = MongoIdValidator(id)
        let res = this.db.collection(this.collection).updateOne(
            {_id:userId},
            {$pull:{experience:experienceName}as any}
        )
        return res
    }

    //this method is for updating a skill or experience
    //example: a user want to update backend to backend-development .. 
    async replaceSkillOrExperience(
        userId: string,
        queryType: string,
        oldValue: string,
        newValue: string
        ) {
        const id = MongoIdValidator(userId);
         
        const res = await this.db.collection(this.collection).updateOne(
            { _id: id, [queryType]: oldValue },
            { $set: { [`${queryType}.$`]: newValue } }
        );

        return res;
    }


    //this method deletes all the data related about user matched with the id
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
        
        let usr_del = await this.db.collection(this.collection).deleteOne(new ObjectId(id))
        return usr_del;
    }
}

