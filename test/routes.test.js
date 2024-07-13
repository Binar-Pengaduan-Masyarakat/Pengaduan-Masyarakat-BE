const request = require("supertest");
const app = require("../app");
const knex = require("knex")(require("../knexfile")("test"));
const databaseSetup = require("../utils/databaseSetup.util");

beforeAll(async () => {
  await databaseSetup();
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.migrate.rollback((all = true));
  await knex.destroy();
});

describe("Chart API", () => {
  test("GET /api/chart/user/role", async () => {
    const response = await request(app).get("/api/chart/user/role");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });

  test("GET /api/chart/user/category", async () => {
    const response = await request(app).get("/api/chart/user/category");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });

  test("GET /api/chart/report/summary", async () => {
    const response = await request(app).get("/api/chart/report/summary");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });

  test("GET /api/chart/user/institution/:userid", async () => {
    const userId = "IN1";
    const response = await request(app).get(
      `/api/chart/user/institution/${userId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("labels");
    expect(response.body.data).toHaveProperty("data");
  });
});

describe("SameReporter API", () => {
  test("POST /api/same-reporter", async () => {
    const newSameReporter = {
      reportId: "UR1",
      userId: "US2",
    };

    const response = await request(app)
      .post("/api/same-reporter")
      .send(newSameReporter);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("reportId");
    expect(response.body.data).toHaveProperty("userId");
  });

  test("GET /api/check-same-reporter/:reportId/:userId", async () => {
    const reportId = "UR1";
    const userId = "US1";

    const response = await request(app).get(
      `/api/check-same-reporter/${reportId}/${userId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("canReport");
    expect(response.body.data).toHaveProperty("message");
  });

  test("GET /api/same-reporter-count/:reportId", async () => {
    const reportId = "UR1";

    const response = await request(app).get(
      `/api/same-reporter-count/${reportId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("count");
    expect(typeof response.body.data.count).toBe("string");
  });

  test("DELETE /api/same-reporter/:reportId/:userId", async () => {
    const reportId = "UR1";
    const userId = "US2";

    const response = await request(app).delete(
      `/api/same-reporter/${reportId}/${userId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data.message).toBe(
      "SameReporter deleted successfully"
    );
  });

  test("DELETE /api/same-reporter/:reportId/:userId - Not Found", async () => {
    const reportId = "UR999";
    const userId = "US999";

    const response = await request(app).delete(
      `/api/same-reporter/${reportId}/${userId}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data.message).toBe("SameReporter not found");
  });
});
