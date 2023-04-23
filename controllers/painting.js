// Import files-functions
import Painting from "../models/painting.js";

export const getAllPaintings = async (req, res) => {
  try {
    let limit = 10;
    if (req.query.limit) limit = req.query.limit;

    let page = 1;
    if (req.query.page) page = req.query.page;

    let query = {};
    if (req.query.username) query.username = req.query.username;

    const paintings = await Painting.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res
      .status(200)
      .json({ success: true, limit, page, count: paintings.length, paintings });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /painting'");
    res.status(500).json({ success: false, error: err.message });
  }
};

export const addPainting = async (req, res) => {
  try {
    const newPainting = new Painting(req.body);
    newPainting.username = res.locals.user.username;
    await newPainting.save();

    res.status(201).json({ success: true, painting: newPainting });
  } catch (err) {
    console.log(err.message, " on Route ", "'POST /painting'");
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getParticularPainting = async (req, res) => {
  try {
    const foundPainting = await Painting.findById(req.params.id);

    // Painting not found
    if (!foundPainting) throw Error();

    res.status(200).json({ success: true, painting: foundPainting });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /painting/:id'");
    res.status(404).json({ success: false, error: err.message });
  }
};

export const editParticularPainting = async (req, res) => {
  try {
    const foundPainting = await Painting.findById(req.params.id);

    if (!foundPainting) throw Error();

    if (res.locals.user.username != foundPainting.username)
      return res.status(401).json({ success: false, error: "Unauthorized" });

    if (req.body.description) foundPainting.description = req.body.description;

    await foundPainting.save();

    res.status(200).json({ success: true, painting: foundPainting });
  } catch (err) {
    console.log(err.message, " on Route ", "'PATCH /painting/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const deleteParticularPainting = async (req, res) => {
  try {
    const foundPainting = await Painting.findById(req.params.id);

    if (!foundPainting) throw Error();

    if (res.locals.user.username != foundPainting.username)
      return res.status(401).json({ success: false, error: "Unauthorized" });

    const deletedPainting = await Painting.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, painting: deletedPainting });
  } catch (err) {
    console.log(err.message, " on Route ", "'DELETE /painting/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};
