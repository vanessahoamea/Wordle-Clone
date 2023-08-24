const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function connect()
{
    await client.connect();
    return client.db("wordle");
}

async function disconnect()
{
    await client.close();
}

module.exports = { connect, disconnect };