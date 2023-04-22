// Import files-functions
import Painting from "../models/painting.js";

export const getAllPaintings = async (req, res) => {
  try {
    let limit = 10;
    if (req.query.limit) limit = req.query.limit;

    let page = 1;
    if (req.query.page) page = req.query.page;

    let query = {};
    if (req.query.userId) query.user = req.query.userId;

    const paintings = await Painting.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res
      .status(200)
      .json({ success: true, limit, page, count: paintings.length, paintings });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const addPainting = async (req, res) => {
  try {
    const newPainting = new Painting(req.body);
    newPainting.user = res.locals.user.id;
    await newPainting.save();

    res.status(201).json(newPainting);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

export const getParticularPainting = async (req, res) => {
  try {
    const foundPainting = await Painting.findById(req.params.id);

    // Painting not found
    if (!foundPainting) throw Error();

    res.status(200).json(foundPainting.populate("user"));
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const editParticularPainting = async (req, res) => {
  try {
    // Cannot update 'title' or 'image'
    if (req.body.title) throw Error("Title cannot be updated");
    if (req.body.picUrl) throw Error("Image cannot be updated");

    const editedPainting = await Painting.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" }
    );

    res.status(200).json(editedPainting.populate("user"));
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

export const deleteParticularPainting = async (req, res) => {
  try {
    const deletedPainting = await Painting.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedPainting.populate("user"));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
