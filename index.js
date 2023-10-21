const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000

//midlleware

//username:mdrifathossainshuvo2812
//pass: VOSsvw8Qtxs2clJX

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://mdrifathossainshuvo2812:VOSsvw8Qtxs2clJX@cluster0.dnlmit0.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('productDB')
    const allcollection = database.collection('products')

    app.get('/brands/:brand',async(req,res)=>{
      const brand = req.params.brand
      const query = {brand:brand}
      const cursor = allcollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
      // res.send('hello')
    })


    app.post('/brands', async(req,res)=>{
      const newc = req.body
      console.log(newc);
      const result = await allcollection.insertOne(newc)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! My name is shuvo. how are you')
})

app.get('/apple', (req,res)=>{
    res.send('hello from apple')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})