import express from "express";
import { purchaseGiftCard, checkGiftCardBalance } from "../db/mydbuser.js";
import { MongoClient } from "mongodb";
const routeruser = express.Router();

import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI);


// Purchase Gift Card
routeruser.post("/purchase-gift-card", async (req, res) => {
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
routeruser.post("/check-balance", async (req, res) => {
  const { name, cardNumber } = req.body;

  try {
    const result = await checkGiftCardBalance(name, cardNumber);

    if (result && result.balance !== undefined) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default routeruser;

