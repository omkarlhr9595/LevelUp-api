import Content from "../../models/freelancer/content.modal.js";

export const contentPost = async (req, res) => {
  user_id = req.user_id;
  try {
    const { user_id, content } = req.body;

    const newContent = new Content({
      user_id,
      content,
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
