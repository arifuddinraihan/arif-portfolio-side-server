const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

// App creation and port
const app = express();
const port = process.env.PORT || 5000;

// Middle Wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tsvgbta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const createdSiteCollection = client.db('myPortfolioDB').collection('createdWebs');
        app.get('/myAllSites', async (req, res) => {
            const query = {}
            const result = await createdSiteCollection.find(query).toArray()
            console.log(result)
            res.send(result)
        })
        app.get('/myAllSites/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id : ObjectId(id) }
            const result = await createdSiteCollection.find(query).toArray()
            console.log(result)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.log)

app.get('/', (req, res) => {
    res.send("Arif's Portfolio server is running!")
})

app.listen(port, () => {
    console.log(`Arif's Portfolio server running on ${port} `)
})