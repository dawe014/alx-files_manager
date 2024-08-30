import { MongoClient } from "mongodb";
// const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "files_manager";
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * This class helps connect to the MongoDB database.
 */
class DBClient {
  constructor() {
    // Connect to the MongoDB server
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        // Save the database and collections if connected
        this.db = client.db(DB_DATABASE);
        this.users = this.db.collection("users");
        this.files = this.db.collection("files");
      } else {
        // Log the error if connection fails
        console.log(err.message);
        this.db = false;
      }
    });
  }

  /**
   * Check if the database connection is alive.
   * @returns {boolean} True if connected, false otherwise.
   */
  isAlive() {
    return !!this.db;
  }

  /**
   * Get the number of users in the database.
   * @returns {Promise<number>} The count of users.
   */
  async nbUsers() {
    return this.users.countDocuments();
  }

  /**
   * Get the number of files in the database.
   * @returns {Promise<number>} The count of files.
   */
  async nbFiles() {
    return this.files.countDocuments();
  }

  /**
   * Find a user based on the given query.
   * @param {Object} query - The query to search for the user.
   * @returns {Promise<Object|null>} The user object or null if not found.
   */
  async getUser(query) {
    const user = await this.db.collection("users").findOne(query);
    return user;
  }
}

// Create an instance of DBClient and export it
const dbClient = new DBClient();
export default dbClient;
