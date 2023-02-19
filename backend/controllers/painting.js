// Import files-functions
import Painting from "../models/painting.js";

export const getPaintings = async (req, res) => {
  const allPaintings = await Painting.find();

  return res.status(200).json({
    ok: true,
    paintings: allPaintings,
  });
};
