import { ObjectId } from "mongodb"

export class MetaDataDto{
    _id?: ObjectId
    created_at: string
    updated_at: string
    constructor(){
        this.created_at = Date.now().toString()
        this.updated_at = Date.now().toString()
    }
}