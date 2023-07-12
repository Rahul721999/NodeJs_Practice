import dotenv from 'dotenv';
dotenv.config();
import {MongoClient} from "mongodb";

// load the env
const url = process.env.DATABASE_URL;
let db;

const connect = async () =>{
    console.log(`${url}`);
    const client = new MongoClient(url);
    try{
        await client.connect();
        db = client.db(process.env.DATABASE_NAME);
        console.log('MongoDB is connected now...')
        return db;
    } catch (e){
        console.log(e);
    }
};
export {connect};