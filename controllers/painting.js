// Import files-functions
import Painting from "../models/painting.js";

export const getAllPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find();

    res.status(200).json(paintings);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const addPainting = async (req, res) => {
  try {
    const newPainting = new Painting(req.body);
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

    res.status(200).json(foundPainting);
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

    res.status(200).json(editedPainting);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

export const deleteParticularPainting = async (req, res) => {
  try {
    const deletedPainting = await Painting.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedPainting);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
