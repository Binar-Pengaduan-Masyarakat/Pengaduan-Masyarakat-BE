const request = require("supertest");
const app = require("../../app");

describe("Report Responses API", () => {
  let createdResponseId;

  it("GET /api/reportResponses - should fetch all report responses", async () => {
    const response = await request(app).get("/api/reportResponses");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Get Data Successfully");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("POST /api/reportResponses - should create a new report response", async () => {
    const newResponse = {
      reportId: "UR1",
      userId: "IN1",
    };

    const response = await request(app)
      .post("/api/reportResponses")
      .send(newResponse);

    expect(response.statusCode).toBe(200);
  });

  it("DELETE /api/reportResponses/:responseId - should delete the report response", async () => {
    const response = await request(app).delete(
      `/api/reportResponses/${createdResponseId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Data Deleted Successfully");
  });

  it("GET /api/reportResponses/:responseId - deleted report response should not be accessible", async () => {
    const response = await request(app).get(
      `/api/reportResponses/${createdResponseId}`
    );
    expect(response.statusCode).toBe(404);
  });
});
