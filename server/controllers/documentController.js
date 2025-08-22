import   Document  from '../models/documentModel.js'; // named import

export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().select("title cloudinaryUrl"); // fetch necessary fields
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
