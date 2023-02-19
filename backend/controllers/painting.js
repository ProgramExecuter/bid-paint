// Import files-functions
import Painting from "../models/painting.js";

export const getPaintings = async (req, res) => {
  const allPaintings = await Painting.find();

  return res.status(200).json({
    ok: true,
    paintings: allPaintings,
  });
};

export const addPainting = async (req, res) => {
  // Check if the title is available
  if (!req.body.title) {
    return res.status(400).json({
      ok: true,
      error: "Title is required.",
    });
  }

  return res.status(200).json("Add Painting");
};
