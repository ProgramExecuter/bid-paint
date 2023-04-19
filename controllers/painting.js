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

export const editParticularPainting = (req, res) => {
  res.status(200).json("Edit a particular painting");
};

export const deleteParticularPainting = (req, res) => {
  res.status(200).json("Delete a particular painting");
};
