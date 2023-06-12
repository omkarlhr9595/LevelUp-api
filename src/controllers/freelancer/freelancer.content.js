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
      likes: {},
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
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Content.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Content.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
