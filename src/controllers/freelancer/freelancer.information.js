import FreelancerInformation from "../../models/freelancer/information.model.js";

// PATCH /freelancer/:id
const updateFreelancerInformation = async (req, res) => {
  try {
    const { id } = req.user_id;
    const { headline, skills, scope, budget } = req.body;

    // Find the freelancer information by the provided id
    const freelancerInfo = await FreelancerInformation.findById(id);

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
