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

describe("SameReporter API", () => {
  test("POST /api/sameReporter", async () => {
    const newSameReporter = {
      reportId: "UR1",
      userId: "US2",
    };

    const response = await request(app)
      .post("/api/sameReporter")
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

  test("DELETE /api/sameReporter/delete", async () => {
    const sameReporterData = {
      reportId: "UR1",
      userId: "US2",
    };

    const response = await request(app)
      .post("/api/sameReporter/delete")
      .send(sameReporterData);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data.message).toBe(
      "SameReporter deleted successfully"
    );
  });

  test("DELETE /api/sameReporter/delete - Not Found", async () => {
    const sameReporterData = {
      reportId: "UR999",
      userId: "US999",
    };

    const response = await request(app)
      .post("/api/sameReporter/delete")
      .send(sameReporterData);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("message");
    expect(response.body.data.message).toBe("SameReporter not found");
  });
});
