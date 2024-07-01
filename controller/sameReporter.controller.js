const sameReporterModel = require("../models/sameReporter.model");

const checkSameReporterConditions = async (req, res) => {
  try {
    const { reportId, userId } = req.params;

    const conditions = await sameReporterModel.checkSameReporterConditions(
      reportId,
      userId
    );

    res.status(200).json(conditions);
  } catch (error) {
    console.error("Error checking SameReporter conditions:", error);
    res.status(500).json({ error: "Failed to check SameReporter conditions" });
  }
};

const postSameReporter = async (req, res) => {
  try {
    const { reportId, userId } = req.body;

    const newSameReporter = await sameReporterModel.createSameReporter(
      reportId,
      userId
    );

    res.status(201).json(newSameReporter);
  } catch (error) {
    console.error("Error posting SameReporter:", error);
    res.status(400).json({ error: "Failed to post SameReporter" });
  }
};

module.exports = {
  checkSameReporterConditions,
  postSameReporter,
};
