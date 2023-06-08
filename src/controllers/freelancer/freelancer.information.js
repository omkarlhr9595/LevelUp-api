import FreelancerInformation from "../../models/freelancer/information.model.js";
import mongoose from "mongoose";
// PATCH /freelancer/:id
const updateFreelancerInformation = async (req, res) => {
  try {
    const { headline, skills, scope, budget } = req.body;

    const id = req.user_id;
    console.log(req.user_id);
    console.log(id);

    // Find the freelancer information by the provided id
    const freelancerInfo = await FreelancerInformation.findOne({
      user_id: id,
    });

    if (!freelancerInfo) {
      return res
        .status(404)
        .json({ error: "Freelancer information not found" });
    }

    // Update the freelancer information fields
    if (headline) {
      freelancerInfo.headline = headline;
    }
    if (skills) {
      freelancerInfo.skills = skills;
    }
    if (scope) {
      freelancerInfo.scope = scope;
    }
    if (budget) {
      freelancerInfo.budget = budget;
    }

    if (req.file.filename) {
      freelancerInfo.profilePhoto = req.file.filename;
    }
    // Save the updated freelancer information
    await freelancerInfo.save();

    res.status(200).json({
      message: "Freelancer information updated successfully",
      data: freelancerInfo,
    });
  } catch (error) {
    console.error("Error updating freelancer information:", error);
    res.status(500).json({ error: "Failed to update freelancer information" });
  }
};

export { updateFreelancerInformation };
