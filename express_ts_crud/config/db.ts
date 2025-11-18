import { MongoClient,Db } from "mongodb";

export let db: Db;
export const db_connect = async ()=>{
    let db_client = new MongoClient("mongodb+srv://cappuccino:letscode5599$@codecaffee.o7etasv.mongodb.net/?appName=codecaffee")
    try{
        await db_client.connect()
        db = db_client.db('spider')
        console.log("database connected")
    }catch(err){
        console.log(err)
    }
}
