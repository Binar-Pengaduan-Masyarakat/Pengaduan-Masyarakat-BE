const request = require("supertest");
const app = require("../../app");

describe("Reports API", () => {
  let createdReportId;

  it("GET /api/reports - should fetch all reports", async () => {
    const response = await request(app).get("/api/reports");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Get Data Success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("POST /api/reports - should create a new report", async () => {
    const newReport = {
      reportContent: "This is a test report",
      categoryId: "CA1",
      userId: "US1",
      district: "Test District",
      subdistrict: "Test Subdistrict",
      address: "Test Address",
    };

    const response = await request(app).post("/api/reports").send(newReport);

    expect(response.statusCode).toBe(200);

    createdReportId = response.text.split("is ")[1].trim();
  });

  it("PUT /api/reports/:reportId - should update the report", async () => {
    const updatedReport = {
      reportContent: "Updated report content",
    };

    const response = await request(app)
      .put(`/api/reports/${createdReportId}`)
      .send(updatedReport);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      `Data Report with ReportId is ${createdReportId} Successfully Updated`
    );
  });

  it("DELETE /api/reports/UR1- should delete the report", async () => {
    const response = await request(app).delete(`/api/reports/UR1`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      `Data report with id UR1 Deleted successfully`
    );
  });

  it("GET /api/reports/:reportId - deleted report should not be accessible", async () => {
    const response = await request(app).get(`/api/reports/${createdReportId}`);

    expect(response.statusCode).toBe(404);
  });
});
