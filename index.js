const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()


app.use(cors({}))
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.is333.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const portfolioCollection = client.db("eRevolute").collection('portfolioCollection');
    const blogsCollection = client.db("eRevolute").collection('blogsCollection');
    
   
   //  find all portfolio 
    app.get('/portfolio' , async(req, res)=>{
       const query = {}
       const result = await portfolioCollection.find(query).toArray()
       res.send(result)
    })

   //  find portfolio by id 
    app.get('/portfolio/:id' , async(req, res)=>{
       const id = req.params.id;
      
      const query = {_id:ObjectId(id)}
       const result = await portfolioCollection.findOne(query)
       res.send(result)
    })

   //  find blogs 
    app.get('/blogs' , async(req, res)=>{
      const query = {}
      const result = await blogsCollection.find(query).toArray()
      res.send(result)
   })

   // find blog by id 
   app.get('/blogs/:id' , async(req, res)=>{
      const id = req.params.id;
      
     const query = {_id:ObjectId(id)}
      const result = await blogsCollection.findOne(query)
      res.send(result)
   })

   // add  blog 
   app.post('/add' , async(req,res)=>{
      const query = req.body;
      const result = await blogsCollection.insertOne(query);
      
      res.send(result)
   })

   // add portfolio 
   app.post('/add-portfolio' , async(req,res)=>{
      const query = req.body;
      const result = await portfolioCollection.insertOne(query);
      
      res.send(result)
   })

   // potfolio delete 
   app.delete('/portfolio/:id' , async(req , res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result = await portfolioCollection.deleteOne(query);
      res.send(result)
   })

   // blog delete 
   app.delete('/blogs/:id' , async(req , res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result = await blogsCollection.deleteOne(query);
      res.send(result)
   })

   // update portfolio 

   app.put('/portfolio/:id', async(req , res)=>{
      const id = req.params.id ;
      const query = {_id:ObjectId(id)}

      const itemsBody1 = req.body.date
      const itemsBody2 = req.body.description
      const itemsBody3 = req.body.name
      const itemsBody4 = req.body.siteLink
      const itemsBody5 = req.body.img
      const itemsBody6 = req.body.img3
      const itemsBody7 = req.body.img2
      const itemsBody8 = req.body.catagory
     
      // console.log(itemsBody1, itemsBody2 , itemsBody3 , itemsBody4 , itemsBody5 , itemsBody6 , itemsBody8 , itemsBody7,query)

      const options = { upsert: true };
      const updateDoc = {
        $set: {
         date : itemsBody1,
         description : itemsBody2,
         name : itemsBody3,
         siteLink : itemsBody4,
         img : itemsBody5,
         img3 : itemsBody6,
         img2 : itemsBody7,
         catagory : itemsBody8
        },
      };
      const result = await portfolioCollection.updateMany(query, updateDoc, options);
      res.send(result)
    });

    app.put('/blogs/:id', async(req , res)=>{
      const id = req.params.id ;
      const query = {_id:ObjectId(id)}
      const blogtitle = req.body.title;
      const blogdescription = req.body.description;
      const blogdate = req.body.date;
      const blogimg = req.body.img;
      const blogcatagory = req.body.catagory;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
         title : blogtitle,
         img : blogimg,
         date : blogdate,
         description : blogdescription,
         catagory : blogcatagory
        },
      };
      const result = await blogsCollection.updateMany(query, updateDoc, options);
      res.send(result)
    });

   
  } finally {
   //  await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
   res.send('eRevolute is running')
})
app.listen(port , ()=>{
   console.log(port , 'eRevolute is running')
})