import Content from "../../models/freelancer/content.modal.js";

export const getPost = async (req, res) => {
  const data = await Content.find();
  res.json({ data });
};

export const contentPost = async (req, res) => {
  try {
    const { user_id, content, title } = req.body;

    const newContent = new Content({
      user_id,
      title,
      content,
      image: req.file.filename,
    });

    await newContent.save();

    res
      .status(201)
      .json({ message: "Content posted successfully", data: newContent });
  } catch (error) {
    console.error("Error posting content:", error);
    res.status(500).json({ error: "Failed to post content" });
  }
};
