/* eslint-disable no-useless-catch */
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

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

export const purchaseGiftCard = async (name, cardNumber, cvv, amount) => {
  try {
    const { db, client } = await connectDatabase();

    // Insert gift card purchase details into the database
    await db.collection("giftCards").insertOne({
      name: name,
      cardNumber: cardNumber,
      cvv: cvv,
      amount: amount,
    });

    client.close();
  } catch (error) {
    throw error;
  }
};

export const checkGiftCardBalance = async (name, cardNumber) => {
  try {
    const { db, client } = await connectDatabase();

    // Query the gift card based on "name" and "cardNumber"
    const giftCard = await db
      .collection("giftCards")
      .findOne({ name, cardNumber });

    client.close();

    if (giftCard) {
      return { balance: giftCard.amount };
    } else {
      return { balance: 0 }; // Card not found
    }
  } catch (error) {
    throw error;
  }
};

