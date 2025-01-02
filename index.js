const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors({
    origin: [
        "http://localhost:3000",

    ]
}))


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.atx9q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();
        // Send a ping to confirm a successful connection

        // Collections
        const unitCollections = client.db('ema-enterprise').collection('all-unit');
        const productCollections = client.db('ema-enterprise').collection('all-product')

        //    Admin 
        // Unit Management
        app.post('/all-unit', async (req, res) => {
            const newUnit = req.body;
            const result = await unitCollections.insertOne(newUnit);
            res.send(result);
        })
        app.get('/all-unit', async (req, res) => {
            const result = await unitCollections.find().toArray() || [];
            res.send(result)
        })
        app.delete('/all-unit/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await unitCollections.deleteOne(query);
            res.send(result);
        })

        // Product Management
        app.post('/all-product', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollections.insertOne(newProduct)
            res.send(result);
        })
        app.get('/all-product', async (req, res) => {
            const result = await productCollections.find().toArray() || [];
            res.send(result);
        })












        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







// test server
app.get('/', (req, res) => {
    res.send('ema-enterprise is working')
})
app.listen(port, () => {
    console.log(`ema-server is working on port: ${port}`)
})