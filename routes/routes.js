import express from "express";
import { getReservations, submitReservation,purchaseGiftCard, checkGiftCardBalance} from "../db/mydb.js";
import { MongoClient } from 'mongodb';
export const rounter = express.Router();

const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI);



// Handle form submission

router.post("/submit-reservation", async (req, res) => {
  try {
    const { name, phone, date, time, people, special } = req.body;

    console.log("Received data from the client:");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("People:", people);
    console.log("Special:", special);

    // Call your submitReservation function to insert data into MongoDB
    await submitReservation(name, phone, date, time, people, special);
    res.status(201).send("Reservation submitted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting reservation.");
  }
});

// Retrieve reservation details by name and phone
router.get("/reservation-details", async (req, res) => {
  try {
    const { name, phone } = req.query;
    console.log("Give data from the mago:");
    const reservations = await getReservations(name, phone);
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving reservation details.");
  }
});

// Purchase Gift Card
router.post('/purchase-gift-card', async (req, res) => {
  try {
    const { name, cardNumber, cvv, amount } = req.body;
  
    console.log("Received data from the client:");
    console.log("Name:", name);
    console.log("Cardnumber:", cardNumber);
    console.log("cvv:", cvv);
    console.log("Amount:", amount);

    const result = await purchaseGiftCard(name, cardNumber, cvv, amount);


    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Check Gift Card Balance
router.post('/check-balance', async (req, res) => {
  const { name, cardNumber } = req.body;

  try {
    const result = await checkGiftCardBalance(name, cardNumber);
    
    if (result && result.balance !== undefined) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Card not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});





export default router;
