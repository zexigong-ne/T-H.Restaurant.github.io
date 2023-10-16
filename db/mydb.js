/* eslint-disable no-useless-catch */
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// The code is well-structured and organized, following the rubric that database code in a seperate folder. 
// Each function handles a specific responsibility related to database operations, making the code easy to understand and maintain.
// The code effectively manages database connections, and implements necessary CRUD operations for a reservations system.
// Some improvements can be made: 
// 1. The code right now export every function in this file. It could be better to put all functions into an object and export that object instead of exporting each functions.
// 2. The try-catch blocks don't add much value here as they simply rethrow the error without additional logging or manipulation. 
// It might be beneficial to log errors or perform some custom error handling before rethrowing.
export const connectDatabase = async () => {
  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db();

    return { client, db };
  } catch (error) {
    throw error;
  }
};

export const connectDel = async () => {
  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db();

    return db;
  } catch (error) {
    throw error;
  }
};

export const submitReservation = async (
  name,
  phone,
  date,
  time,
  people,
  special
) => {
  try {
    const { db, client } = await connectDatabase();
    // Insert reservation into the database
    await db.collection("reservations").insertOne({
      name: name,
      phone: phone,
      date: date,
      time: time,
      people: people,
      special: special,
    });

    client.close();
  } catch (error) {
    throw error;
  }
};

export const getReservations = async (name, phone) => {
  try {
    const { db, client } = await connectDatabase();

    // Query reservations based on name and phone
    const reservations = await db
      .collection("reservations")
      .find({ name, phone })
      .toArray();

    client.close();
    return reservations;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (db, name, phone, updatedData) => {
  try {
    const reservations = db.collection("reservations");
    const filter = { name, phone };
    const updateDoc = {
      $set: updatedData,
    };

    const result = await reservations.updateOne(filter, updateDoc);

    if (result.modifiedCount > 0) {
      return true; // Indicates success
    } else {
      return false; // No documents were updated
    }
  } catch (error) {
    throw error;
  }
};




export const deleteReservation = async (db, name, phone) => {
  const client = db.client;
  const reservations = db.collection("reservations");

  const filter = { name, phone };

  const result = await reservations.deleteOne(filter);

  client.close(); 

  return result.deletedCount;
};

