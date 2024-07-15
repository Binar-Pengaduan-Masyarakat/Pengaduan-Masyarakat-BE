/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const tables = [
    "User",
    "Category",
    "UserCategory",
    "UserReport",
    "ReportResponse",
    "ReportResult",
    "SameReporter",
  ];

  await Promise.all(
    tables.map((table) =>
      knex.raw(`ALTER TABLE "${table}" DISABLE TRIGGER ALL;`)
    )
  );

  await Promise.all(tables.map((table) => knex(table).del()));

  await knex("User").insert([
    {
      userId: "US1",
      name: "Asep",
      email: "asep@example.com",
      password: "asepganteng",
      roles: "USER",
    },
    {
      userId: "US2",
      name: "Alice",
      email: "alice@example.com",
      password: "pass123",
      roles: "USER",
    },
    {
      userId: "IN1",
      name: "Bob",
      email: "bob@example.com",
      password: "securepwd",
      roles: "INSTITUTION",
    },
    {
      userId: "SU1",
      name: "Charlie",
      email: "charlie@example.com",
      password: "admin123",
      roles: "SUPERADMIN",
    },
    {
      userId: "US3",
      name: "David",
      email: "david@example.com",
      password: "david123",
      roles: "USER",
    },
    {
      userId: "IN2",
      name: "Eva",
      email: "eva@example.com",
      password: "evapassword",
      roles: "INSTITUTION",
    },
    {
      userId: "US4",
      name: "Frank",
      email: "frank@example.com",
      password: "frankpass",
      roles: "USER",
    },
    {
      userId: "IN3",
      name: "Grace",
      email: "grace@example.com",
      password: "gracepwd",
      roles: "INSTITUTION",
    },
  ]);

  await knex("Category").insert([
    { categoryId: "CA1", categoryName: "Road Damage" },
    { categoryId: "CA2", categoryName: "Public Facility Issues" },
    { categoryId: "CA3", categoryName: "Environmental Concern" },
    { categoryId: "CA4", categoryName: "Noise Pollution" },
    { categoryId: "CA5", categoryName: "Lighting Issues" },
    { categoryId: "CA6", categoryName: "Water Leakage" },
    { categoryId: "CA7", categoryName: "Garbage Disposal" },
  ]);

  await knex("UserCategory").insert([
    { userCategoryId: "UC1", categoryId: "CA1", userId: "IN1" },
    { userCategoryId: "UC2", categoryId: "CA2", userId: "IN2" },
    { userCategoryId: "UC3", categoryId: "CA3", userId: "IN3" },
    { userCategoryId: "UC4", categoryId: "CA4", userId: "IN4" },
  ]);

  await knex("UserReport").insert([
    {
      reportId: "UR1",
      reportContent: "Pothole on Main St",
      categoryId: "CA1",
      userId: "US1",
      district: "District A",
      subdistrict: "Subdistrict 1",
      address: "123 Main St",
    },
    {
      reportId: "UR2",
      reportContent: "Broken street light",
      categoryId: "CA2",
      userId: "US2",
      district: "District B",
      subdistrict: "Subdistrict 2",
      address: "456 Light St",
    },
    {
      reportId: "UR3",
      reportContent: "Water leakage in park",
      categoryId: "CA3",
      userId: "US3",
      district: "District C",
      subdistrict: "Subdistrict 3",
      address: "789 Park St",
    },
    {
      reportId: "UR4",
      reportContent: "Garbage not collected",
      categoryId: "CA4",
      userId: "US4",
      district: "District D",
      subdistrict: "Subdistrict 4",
      address: "101 Garbage St",
    },
  ]);

  await knex("ReportResponse").insert([
    { responseId: "RR1", reportId: "UR1", userId: "IN1" },
    { responseId: "RR2", reportId: "UR2", userId: "IN2" },
    { responseId: "RR3", reportId: "UR3", userId: "IN3" },
    { responseId: "RR4", reportId: "UR4", userId: "IN4" },
  ]);

  await knex("ReportResult").insert([
    {
      resultId: "RE1",
      reportId: "UR1",
      userId: "IN1",
      resultContent: "Issue resolved - pothole filled.",
    },
    {
      resultId: "RE2",
      reportId: "UR2",
      userId: "IN2",
      resultContent: "Issue resolved - street light fixed.",
    },
    {
      resultId: "RE3",
      reportId: "UR3",
      userId: "IN3",
      resultContent: "Issue resolved - water leakage fixed.",
    },
    {
      resultId: "RE4",
      reportId: "UR4",
      userId: "IN4",
      resultContent: "Issue resolved - garbage collected.",
    },
  ]);

  await knex("SameReporter").insert([
    { sameReporterId: "SR1", reportId: "UR1", userId: "US1" },
    { sameReporterId: "SR2", reportId: "UR2", userId: "US2" },
    { sameReporterId: "SR3", reportId: "UR3", userId: "US3" },
    { sameReporterId: "SR4", reportId: "UR4", userId: "US4" },
  ]);

  await Promise.all(
    tables.map((table) =>
      knex.raw(`ALTER TABLE "${table}" ENABLE TRIGGER ALL;`)
    )
  );
};
