import express from 'express';
const app = express();
import {connect, disconnect} from './database.js';
import mongodb from 'mongodb';

// import the dotenv lib
import dotenv from 'dotenv';
dotenv.config();

// get the value from .env file
const PORT = process.env.PORT;


import bodyParser from 'body-parser';
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.listen(PORT, () => console.log(`server is running on PORT no: ${PORT}`));







/* ------------------------Create API------------------------ */
app.post('/create', async(req, res)=>{
    let data = {
        name : req.body.name, 
        email : req.body.email, 
        password : req.body.password, 
    };
    try{
        const db = await connect();
        const coll = db.collection("users");
        const result = await coll.insertOne(data);
        res.send("Document created successfuly, id: " + result.insertedId)        
    }catch(e){
        console.log(e)
    }finally{
        await disconnect();
    }
})

/* ------------------------Read API------------------------ */

app.get('/read', async (req, res) => {
    try {
        const db = await connect();
        const coll = db.collection("users");
        const query = {name : req.body.name};
        const options = { 
            sort: {"_id": -1},
            projection: { _id: 1,name: 1, email: 1, password: 1},
        };
        const details = await coll.findOne(query, options);
        console.log(details);
        res.send(details);
    }catch(e){
        console.log(e)
    }finally{
        await disconnect();
    }
})

/* ------------------------Update API------------------------ */
app.put('/update', async (req, res) =>{
    try{
        const db = await connect();
        const coll = db.collection("users");

        // create filter for the document to update...
        const filter = {name : req.body.name};

        // if the given document is not present then create one..
        const options = {upsert : true};

        // value to be update
        const updateDoc = {
            $set : {
                email : `${req.body.email}`,
                password : `${req.body.password}`
            }
        }

        const result = await coll.updateOne(filter, updateDoc, options);
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
        res.send("Updated successfully");

    }catch(e){
        console.log(e)
    }finally{
        await disconnect();
    }
})

/* ------------------------Delete API------------------------ */
app.delete('/delete', async(req, res)=>{
    try{
        const db = await connect();
        const coll = db.collection("users");

        const id = new mongodb.ObjectId(req.body.id);
        console.log(id);
        const query = {_id: id};
        const result = await coll.deleteOne(query);
        console.log(result.deletedCount)
        if (result.deletedCount > 0){
            res.send(`Successfully deleted one document. Deleted doc count : ${result.deletedCount}`);
        }else{
            res.send('No document matched query. Deleted doc Count : 0');
        }
    }catch(e){
        console.log(e)
    }finally{
        await disconnect();
    }
})
