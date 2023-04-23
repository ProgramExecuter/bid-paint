// Import files-functions
import Auction from "../models/auction.js";

export const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().populate("painting bids.user");

    res.status(200).json({ success: true, auctions });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /auction'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const createAuction = async (req, res) => {
  try {
    const newAuction = new Auction(req.body);
    await newAuction.save();

    res.status(201).json({ success: true, newAuction });
  } catch (err) {
    console.log(err.message, " on Route ", "'POST /auction'");
    res.status(400).json({ success: false, error: "Not Found" });
  }
};

export const getParticularAuction = async (req, res) => {
  try {
    const foundAuction = await Auction.findById(req.params.id);

    if (!foundAuction) throw Error();

    res.status(200).json({ success: true, auction: foundAuction });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /auction/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
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

    res.status(201).json({ success: true, biddedAuction: foundAuction });
  } catch (err) {
    console.log(err.message, " on Route ", "'POST /auction/:id/makeBid'");
    res.status(400).json({ success: false, error: "Bad request" });
  }
};
