const request = require("supertest");
const app = require("../../app");
describe("Chart API", () => {
  test("GET /api/charts/users/roles", async () => {
    const response = await request(app).get("/api/charts/users/roles");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });

  test("GET /api/charts/institutions/categories", async () => {
    const response = await request(app).get(
      "/api/charts/institutions/categories"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });

  test("GET /api/charts/reports/stats", async () => {
    const response = await request(app).get("/api/charts/reports/stats");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });

  test("GET /api/charts/institution/:userid", async () => {
    const userId = "IN1";
    const response = await request(app).get(
      `/api/charts/institution/${userId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });
});
