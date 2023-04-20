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
  res.status(200).json("Create auction");
};

export const getParticularAuction = (req, res) => {
  res.status(200).json("Get a particular auction");
};

export const makeBidOnAuction = (req, res) => {
  res.status(200).json("Get a bid on particular auction");
};
