import dotenv from 'dotenv';
dotenv.config();
import {MongoClient} from "mongodb";

// load the env
const url = process.env.DATABASE_URL;
let db;
const client = new MongoClient(url);

const connect = async () =>{
    console.log(`🚀Connecting MongoDb with url: ${url}`);
    try{
        await client.connect();
        db = client.db(process.env.DATABASE_NAME);
        console.log('✅MongoDB is connected now...')
        return db;
    } catch (e){
        console.log(e);
    }
};

const disconnect = async () =>{
    console.log('🚀Disconnecting Mongodb...');
    client.close()
    console.log('✅Disconnected with MongoDB..')
}
export {connect, disconnect};