const request = require("supertest");
const app = require("../../app");
describe("User API", () => {
  const testUser = {
    userId: "TESTUSER1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    roles: "USER",
  };

  let createdUserId;

  it("POST /api/users - should create a new user", async () => {
    const response = await request(app).post("/api/users").send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User profile created successfully.");

    createdUserId = response.body.data.userId;
  });

  it("GET /api/users/:userId - should retrieve user details", async () => {
    const response = await request(app).get(`/api/users/US1`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User profile retrieved successfully.");
    expect(response.body.data.userId).toBe("US1");
    expect(response.body.data.email).toBe("asep@example.com");
  });

  it("PUT /api/users/:userId - should update user details", async () => {
    const updatedUser = {
      name: "Updated Test User",
      email: "updatedtest@example.com",
    };

    const response = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User profile updated successfully.");
  });

  it("DELETE /api/users/:userId - should delete the user", async () => {
    const response = await request(app).delete(`/api/users/${createdUserId}`);

    expect(response.statusCode).toBe(204);

    const getUserResponse = await request(app).get(
      `/api/users/${createdUserId}`
    );
    expect(getUserResponse.statusCode).toBe(404);
  });

  it("GET /api/users/:userId - should return 404 for deleted user", async () => {
    const response = await request(app).get(`/api/users/${createdUserId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe(
      "User not found. Please check the user ID and try again."
    );
  });
});
