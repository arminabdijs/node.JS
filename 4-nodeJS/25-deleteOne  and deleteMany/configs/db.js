const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

const dbConnection = new MongoClient(process.env.MONGODB_URI);

const dbName = process.env.DB_NAME;

const main = async () => {
  try {
    await dbConnection.connect();
    console.log("Connected to MongoDB at " + process.env.MONGODB_URI);

    const db = dbConnection.db(dbName);

    const usersCollection = db.collection("users");

    // * Delete one document
    /* const result = await usersCollection.deleteOne({ _id:new ObjectId("67af7b37f8369ad3f5a40ac5") });
    console.log(result); */

    // * find and delete one document
    /* const result = await usersCollection.findOneAndDelete({
      crime: { $gt: 30 },
    });
    console.log(result); */

    // * Delete many documents
    /* const result = await usersCollection.deleteMany({ crime: { $gt: 30 } });
    console.log(result.deletedCount); */

    

    // *? operator for comparison
    // *! $gt ==> greater than
    // *! $gte ==> greater than equal to
    // *! $lt ==> less than
    // *! $lte ==> less than equal to
    // *! $eq ==> equal to
    // *! $ne ==> not equal to
    // *! $in ==> in[1,2,3]
    // *! $nin ==> not in[1,2,3]

    console.log("Database selected: " + dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

main();
