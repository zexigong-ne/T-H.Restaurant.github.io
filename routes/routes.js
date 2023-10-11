import express from "express";
import { getReservations, submitReservation } from "../db/mydb.js";
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

export default router;
