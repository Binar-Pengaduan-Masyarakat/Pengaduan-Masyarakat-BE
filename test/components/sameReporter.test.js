const request = require("supertest");
const app = require("../../app");
describe("SameReporter API", () => {
  test("POST /api/sameReporter/UR1", async () => {
    const newSameReporter = {
      userId: "US2",
    };

    const response = await request(app)
      .post("/api/sameReporter/UR1")
      .send(newSameReporter);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("reportId");
    expect(response.body.data).toHaveProperty("userId");
  });

  test("GET /api/sameReporter/:reportId/:userId", async () => {
    const reportId = "UR1";
    const userId = "US1";

    const response = await request(app).get(
      `/api/sameReporter/${reportId}/${userId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("canReport");
    expect(response.body.data).toHaveProperty("message");
  });

  test("GET /api/sameReporter/count/:reportId", async () => {
    const reportId = "UR1";

    const response = await request(app).get(
      `/api/sameReporter/count/${reportId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("count");
    expect(typeof response.body.data.count).toBe("string");
  });

  test("DELETE /api/sameReporter/delete/UR1", async () => {
    const sameReporterData = {
      userId: "US2",
    };

    const response = await request(app)
      .post("/api/sameReporter/delete/UR1")
      .send(sameReporterData);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data.message).toBe(
      "SameReporter deleted successfully"
    );
  });
});
