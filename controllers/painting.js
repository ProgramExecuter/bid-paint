export const getAllPaintings = (req, res) => {
  console.log(req.body);
  res.status(200).json("Get all paintings");
};

export const addPainting = (req, res) => {
  res.status(200).json("Add new painting");
};

export const getParticularPainting = (req, res) => {
  res.status(200).json("Get a particular painting");
};

export const editParticularPainting = (req, res) => {
  res.status(200).json("Edit a particular painting");
};

export const deleteParticularPainting = (req, res) => {
  res.status(200).json("Delete a particular painting");
};
