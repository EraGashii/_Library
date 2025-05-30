import handler from "../../pages/api/blogs/index";
import { createMocks } from "node-mocks-http";

describe("API /api/blogs", () => {
  it("kthehet me sukses (GET)", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });

  it("krijon një blog të ri (POST)", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Test", description: "Blog test", coverImage: "img.png" },
    });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(201);
  });
});


