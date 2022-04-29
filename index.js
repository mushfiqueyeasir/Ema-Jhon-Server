const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

//MOndoDB  connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emmtc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db('Ema_John').collection('product');

        //Load Data
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        //Product  Count
        app.get('/productCount', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const count = await cursor.count();
            res.send({ count });
        })

    }
    finally {

    }

}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Ema-John Running!');
})

app.listen(port, () => {
    console.log('Server is running!');
})