const request = require("supertest");
const app = require("../../app");

describe("Institution API", () => {
  it("GET /api/institutions - should fetch all institutions", async () => {
    const response = await request(app).get("/api/institutions");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((institution) => {
      expect(institution.roles).toBe("INSTITUTION");
    });
  });

  it("GET /api/institutions/:userId - should retrieve institution details", async () => {
    const existingInstitutionId = "IN1";
    const response = await request(app).get(
      `/api/institutions/${existingInstitutionId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(existingInstitutionId);
    expect(response.body.roles).toBe("INSTITUTION");
  });

  it("PUT /api/institutions/:userId - should update institution details", async () => {
    const existingInstitutionId = "IN1";
    const updatedData = {
      name: "Updated Institution Name",
    };

    const response = await request(app)
      .put(`/api/institutions/${existingInstitutionId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
  });

  it("DELETE /api/institutions/:userId - should delete the institution", async () => {
    const existingInstitutionId = "IN1";
    const response = await request(app).delete(
      `/api/institutions/${existingInstitutionId}`
    );

    expect(response.statusCode).toBe(204);

    const getResponse = await request(app).get(
      `/api/institutions/${existingInstitutionId}`
    );
    expect(getResponse.statusCode).toBe(404);
  });
});
