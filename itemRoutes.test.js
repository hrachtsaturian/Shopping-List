process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");

let items = require("./fakeDB");

let item = { name: "messy", price: 58 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

test("Gets a list of items", async function () {
  const response = await request(app).get(`/items`);
  const { items } = response.body;
  expect(response.statusCode).toBe(200);
});

test("Gets a single item", async function () {
  const response = await request(app).get(`/items/${item.name}`);
  expect(response.statusCode).toBe(200);
});

test("Creates a new item", async function () {
  const response = await request(app).post(`/items`).send({
    name: "Taco",
    price: 0,
  });
  expect(response.statusCode).toBe(200);
});

test("Updates a single item", async function () {
  const response = await request(app).patch(`/items/${item.name}`).send({
    name: "Troll",
  });
  expect(response.statusCode).toBe(200);
});

test("Responds with 404 if can't find item", async function () {
  const response = await request(app).patch(`/items/0`);
});

test("Deletes a single a item", async function () {
  const response = await request(app).delete(`/items/${item.name}`);
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ message: "Deleted" });
});
