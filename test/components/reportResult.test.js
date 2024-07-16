const request = require("supertest");
const app = require("../../app");

describe("Report Results API", () => {
  let createdResultId;

  it("GET /api/reportResults - should fetch all report results", async () => {
    const response = await request(app).get("/api/reportResults");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Get Data Successfully");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("POST /api/reportResults - should create a new report result", async () => {
    const newResult = {
      reportId: "UR1",
      userId: "US1",
      resultContent: "This is a test result",
    };

    const response = await request(app)
      .post("/api/reportResults")
      .send(newResult);

    expect(response.statusCode).toBe(200);
  });

  it("PUT /api/reportResults/:resultId - should update the report result", async () => {
    const updatedResult = {
      resultContent: "Updated report result content",
    };

    const response = await request(app)
      .put(`/api/reportResults/${createdResultId}`)
      .send(updatedResult);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Data Updated Successfully");
  });

  it("DELETE /api/reportResults/:resultId - should delete the report result", async () => {
    const response = await request(app).delete(
      `/api/reportResults/${createdResultId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Data Deleted Successfully");
  });

  it("GET /api/reportResults/:resultId - deleted report result should not be accessible", async () => {
    const response = await request(app).get(
      `/api/reportResults/${createdResultId}`
    );
    expect(response.statusCode).toBe(404);
  });
});
