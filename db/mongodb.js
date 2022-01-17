const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const dbUser = process.env.dbUser;
const dbPass = process.env.dbPass;

//const url = 'mongodb://localhost:27017'
const url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.m1ez6.mongodb.net/everglow_services?retryWrites=true&w=majority`

function getClient (callback){
    MongoClient.connect(url, (err, client) => {
        if(err) callback(err, undefined)
        console.log('Conectado a la DB')
        const db = client.db('everglow_services')
        return callback(undefined, db)
    })
    
}

module.exports = getClient
