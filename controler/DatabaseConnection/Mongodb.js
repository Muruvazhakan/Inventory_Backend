const {MongoClient,ServerApiVersion} = require('mongodb');

// const datas =require('../../datas');
const datas = "mongodb+srv://billedge:Muru_1998@muru.ypd86.mongodb.net/billedgeprod?retryWrites=true&w=majority&appName=Muru";
// const uri = "mongodb+srv://murutestdb:Muru@1998@muru.ypd86.mongodb.net/?retryWrites=true&w=majority&appName=Muru";
// const uri = "mongodb+srv://murutestdb:Muru_1998@muru.ypd86.mongodb.net/EzhilElit?retryWrites=true&w=majority&appName=EzhilElit";

const client = new MongoClient(datas,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,
    }
})

async function run() {
    try{
        await client.connect();

        await client.db("admin").command({ping:1});
        console.log("Pinged you deployment. You successfully connected to MongoDB!");
    }finally{
        console.log("Closing the connection");
        await client.close();
    }
}
run().catch(console.dir);