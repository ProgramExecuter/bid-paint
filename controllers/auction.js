// Import files-functions
import Auction from "../models/auction.js";

export const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("painting bids.user");

    res.status(200).json(auctions);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const createAuction = async (req, res) => {
  try {
    const newAuction = new Auction(req.body);
    await newAuction.save();

    res.status(201).json(newAuction);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(400);
  }
};

export const getParticularAuction = async (req, res) => {
  try {
    const foundAuction = await Auction.findById(req.params.id);

    if (!foundAuction) throw Error();

    res.status(200).json(foundAuction);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const makeBidOnAuction = async (req, res) => {
  try {
    const foundAuction = await Auction.findById(req.params.id);

    if (!foundAuction) throw Error();

    const newBid = { user: res.locals.user.id, bidAmount: req.body.bidAmount };

    const newBidsArr = [...foundAuction.bids, newBid];
    foundAuction.bids = newBidsArr;

    await foundAuction.save();

    res.status(201).json(foundAuction);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
