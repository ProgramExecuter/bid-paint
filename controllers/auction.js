export const getAllAuctions = (req, res) => {
  res.status(200).json("Get all auctions");
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
