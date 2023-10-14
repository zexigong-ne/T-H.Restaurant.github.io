import express from "express";
import {
  getReservations,
  submitReservation,
  updateReservation,
  deleteReservation,
  connectDatabase,
  connectDel,
} from "../db/mydb.js";
import { MongoClient } from "mongodb";
const router = express.Router();
import dotenv from "dotenv";
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

// Update Reservation
router.put("/update-reservation", async (req, res) => {
  const { name, phone, date, time, people, special } = req.body;

  try {
    const { db, client } = await connectDatabase();
    console.log("Update data from the mago:");
    await updateReservation(db, name, phone, {
      date,
      time,
      people,
      special,
    });

    res.status(200).send("Reservation updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


// Delete Reservation
router.post("/delete-reservation", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const db = await connectDel(); // Get the database object
    console.log("Delete data from the mago:");
    const deletedCount = await deleteReservation(db, name, phone);

    if (deletedCount > 0) {
      res.status(200).send("Reservation deleted successfully");
    } else {
      res.status(404).send("Reservation not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


export default router;
