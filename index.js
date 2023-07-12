import express from 'express';
const app = express();
import {connect} from './database.js';

// import the dotenv lib
import dotenv from 'dotenv';
dotenv.config();

// get the value from .env file
const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`server is running on PORT no: ${PORT}`));

app.get('/read', async (req, res) => { // res.send("Hellow world");
    try {
        const db = await connect();
        const coll = db.collection("users");
        const query = {name : "Ned Stark"};
        const options = { 
            sort: {"_id": -1},
            projection: { _id: 0,name: 1, email: 1, password: 1},
        };
        const details = await coll.findOne(query, options);
        console.log(details);
        res.send(details);
    }catch(e){
        console.log(e)
    }

})
