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

    const result = await usersCollection.updateOne(
      {
        name: "Alice Johnson",
      },
      {
        $set: {
          name: "Alice Johnson",
          username: "Alice Johnson",
          password: "12345678",
          programming: "JavaScript",
        },
        // To remove a field from a document during an update, the $unset operator is used
        $unset: {
          email: "",
          address: "",
          phone: "",
          role: "",
        },
        // To increment the value of a field by a specified amount
        /* $inc: {
      crime: -150,
    }, */
        // To multiply the value of a field by a specified amount
        /* $min:{
      crime: 0,
    } */
        // To multiply the value of a field by a specified amount
        $max: {
          crime: 999999999,
        },
      }
    );

    console.log(result);

    console.log("Database selected: " + dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

main();
