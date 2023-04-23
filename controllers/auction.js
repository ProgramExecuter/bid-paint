// Import files-functions
import Auction from "../models/auction.js";
import Painting from "../models/painting.js";

export const getAllAuctions = async (req, res) => {
  try {
    let limit = 10;
    if (req.query.limit) limit = req.query.limit;

    let page = 1;
    if (req.query.page) page = req.query.page;

    let query = {};
    if (req.query.paintingId) {
      query.painting = {};
      query.painting._id = req.query.paintingId;
    }

    const auctions = await Auction.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("painting bids.user");

    const count = auctions.length;

    res.status(200).json({ success: true, count, page, limit, auctions });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /auction'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const createAuction = async (req, res) => {
  try {
    if (!req.body.painting) throw Error();

    const foundPainting = await Painting.findById(req.body.painting);

    if (!foundPainting) throw Error();

    if (res.locals.user.id != foundPainting.user)
      return res.status(401).json({ success: false, error: "Unauthorized" });

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
