const institutionService = require("../services/institution.services");

const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await institutionService.getAllInstitutions();
    const institutionsWithoutSensitiveData = institutions.map((institution) => {
      const {
        password,
        verificationToken,
        ...institutionWithoutSensitiveData
      } = institution;
      return institutionWithoutSensitiveData;
    });
    res.json(institutionsWithoutSensitiveData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInstitutionById = async (req, res) => {
  try {
    const institution = await institutionService.getInstitutionById(
      req.params.userId
    );
    if (institution) {
      const {
        password,
        verificationToken,
        ...institutionWithoutSensitiveData
      } = institution;
      res.json(institutionWithoutSensitiveData);
    } else {
      res.status(404).json({ message: "Institution not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, categoryId } = req.body;
    const institutionImage = req.file ? req.file.filename : null;

    const updatedData = {
      name,
      categoryId,
      image: institutionImage,
    };

    const updatedInstitution = await institutionService.updateInstitution(
      userId,
      updatedData
    );
    const { password, verificationToken, ...institutionWithoutSensitiveData } =
      updatedInstitution;

    res.json(institutionWithoutSensitiveData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    await institutionService.deleteInstitution(req.params.userId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
};
