const request = require("supertest");
const app = require("../../app");

describe("Category API", () => {
  let createdCategoryId;

  it("GET /api/categories - should fetch all categories", async () => {
    const response = await request(app).get("/api/categories");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("POST /api/categories - should create a new category", async () => {
    const newCategory = {
      categoryName: "Test Category",
    };

    const response = await request(app)
      .post("/api/categories")
      .send(newCategory);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Category created successfully");

    const getResponse = await request(app).get("/api/categories");
    createdCategoryId =
      getResponse.body[getResponse.body.length - 1].categoryId;
  });

  it("GET /api/categories/:categoryId - should get a specific category by ID", async () => {
    const response = await request(app).get(
      `/api/categories/${createdCategoryId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body[0].categoryName).toBe("Test Category");
  });

  it("PUT /api/categories/:categoryId - should update the category", async () => {
    const updatedCategory = {
      categoryName: "Updated Category Name",
    };

    const response = await request(app)
      .put(`/api/categories/${createdCategoryId}`)
      .send(updatedCategory);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Category updated successfully");
  });

  it("DELETE /api/categories/:categoryId - should delete the category", async () => {
    const response = await request(app).delete(
      `/api/categories/${createdCategoryId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Category deleted successfully");
  });

  it("GET /api/categories/:categoryId - should return 404 for deleted category", async () => {
    const response = await request(app).get(
      `/api/categories/${createdCategoryId}`
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Category not found");
  });
});
