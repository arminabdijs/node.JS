const {MongoClient}=require("mongodb")

const url="mongodb://localhost:27017/"

const dbConnection=new MongoClient(url)

const dbName="library"

const main =async () =>{
    await dbConnection.connect()

    console.log("Connected to MongoDB at " + url)

    const db = dbConnection.db(dbName)

    return "Done connecting"


}

main()

