import { Module } from "@nestjs/common";
import { MongoClient } from "mongodb";
//module for using database access
const mongoprovider = {
    provide:"MONGO_DB",
    useFactory:async ()=>{
        let mongo = new MongoClient("mongodb://localhost:27017/")
        try{
            await mongo.connect()
            let db = mongo.db("dev_community")
            return db;
        }catch(err){
            console.log("Mongo Connect Error")
            return 0;
        }
    }
}

@Module({
    providers:[mongoprovider],
    exports:[mongoprovider]
})
export class MongoModule{}