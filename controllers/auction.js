// Import files-functions
import Auction from "../models/auction.js";

export const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();

    res.status(200).json(auctions);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const createAuction = (req, res) => {
  try {
    const newAuction = new Auction(req.body);

    res.status(201).json(newAuction);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(400);
  }
};

export const getParticularAuction = (req, res) => {
  res.status(200).json("Get a particular auction");
};

export const makeBidOnAuction = (req, res) => {
  res.status(200).json("Get a bid on particular auction");
};
