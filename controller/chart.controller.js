const chartModel = require("../models/chart.model");

const getRoleDataset = async (req, res) => {
  try {
    const roles = ["USER", "INSTITUTION"];
    const { labels, data } = await chartModel.getRoleDataset(roles);
    if (!data || data.length === 0) {
      throw new Error("no user found");
    }
    res.status(200).json({ labels, data });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(400).json({ error: "Failed to fetch user data" });
  }
};

const getCategoryDataset = async (req, res) => {
  try {
    const { labels, data } = await chartModel.getUserCategoryDataset();
    if (!data || data.length === 0) {
      throw new Error("No data found");
    }
    res.status(200).json({ labels, data });
  } catch (err) {
    console.error("Error fetching category data:", err);
    res.status(400).json({ error: "Failed to fetch category data" });
  }
};

const getReportStatsDataset = async (req, res) => {
  try {
    const { labels, data } = await chartModel.getReportStatsDataset();
    if (!data || data.length === 0) {
      throw new Error("No data found");
    }
    res.status(200).json({ labels, data });
  } catch (err) {
    console.error("Error fetching report summary data:", err);
    res.status(400).json({ error: "Failed to fetch report summary data" });
  }
};

const getUserReportResponseDataset = async (req, res) => {
  try {
    const userid = req.params.userid;
    const { labels, data } = await chartModel.getUserReportResponseDataset(
      userid
    );

    if (!data || data.length === 0) {
      throw new Error("No data found");
    }

    res.status(200).json({ labels, data });
  } catch (err) {
    console.error("Error fetching user report response data:", err);
    res
      .status(400)
      .json({ error: "Failed to fetch user report response data" });
  }
};

module.exports = {
  getRoleDataset,
  getCategoryDataset,
  getReportStatsDataset,
  getUserReportResponseDataset,
};
