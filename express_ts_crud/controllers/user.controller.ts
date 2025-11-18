import type{Request,Response, NextFunction} from 'express';
import { req_body_validator } from '../guards/req_body_validator';
import { db } from '../config/db';
import { createUser } from '../providers/user.provider';
import { InsertUser, UpdateUser, User } from '../models/user.model';
import { Document, ObjectId } from 'mongodb';

export const findAll = async(req: Request, res: Response, next: NextFunction)=>{
   const users:Document[] = await db.collection('users').find({}).toArray()
   console.log(users)
   res.send(users)
}

export const update = async(req: Request, res: Response, next: NextFunction)=>{
   const id = req.params.id;
   const data: UpdateUser = req.body
   console.log(data)
   try{
      db.collection('users').updateOne(
         {_id: new ObjectId(id)},
         {$set:data}
      )
      res.send({"status":"success",data:data})
   }catch(err){
      console.log(err)
   }
}

export const remove = async(req: Request, res: Response, next: NextFunction)=>{
   let id = req.params.id
   try{
      db.collection('users').deleteOne(
         {_id:new ObjectId(id)}
      )
      res.send({"status":"success"})
   }catch(err){
      console.log(err)
   }
}

export const create = async(req: Request, res: Response, next: NextFunction)=>{
   const req_data: InsertUser = req.body;
   console.log(req_data)
   res.send("data received")
   //const validation_flag = req_body_validator(req_data)
   //console.log("Validation flag",validation_flag)
   // if(validation_flag){
   //  try{
   //    const final_data:InsertUser = createUser(req_data)
   //    db.collection('users').insertOne(final_data)
   //    res.send({"data":final_data})
   //  }catch(err){
   //    console.log(err)
   //  }
   // }else{
   //  res.send({"message":"invalid data formation","data":req_data})
   // }
}

export const findById = async(req: Request, res: Response, next: NextFunction)=>{
   let id = req.params.id
   const user: Document | null = await db.collection('users').findOne(
      {_id:new ObjectId(id)}
   )
   res.send({"status":"success","data":user})
}
