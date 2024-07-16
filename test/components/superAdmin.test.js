const request = require("supertest");
const app = require("../../app");
describe("Super Admin API", () => {
  it("GET /api/superAdmin/users - should fetch all users", async () => {
    const response = await request(app).get("/api/superAdmin/users");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/superAdmin/institutions - should fetch all institutions", async () => {
    const response = await request(app).get("/api/superAdmin/institutions");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((institution) => {
      expect(institution.roles).toBe("INSTITUTION");
    });
  });

  it("POST /api/superAdmin/institutions - should create a new institution", async () => {
    const newInstitution = {
      name: "Test Institution",
      email: "testinstitution@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/superAdmin/institutions")
      .send(newInstitution);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Institution created successfully");

    const getInstitutionResponse = await request(app).get(
      "/api/superAdmin/institutions"
    );
    const createdInstitution = getInstitutionResponse.body.find(
      (inst) => inst.email === newInstitution.email
    );
    expect(createdInstitution).toBeDefined();
    expect(createdInstitution.name).toBe(newInstitution.name);
  });
});
