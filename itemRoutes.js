const express = require("express");
const router = new express.Router();
const items = require("./fakeDB");

router.get("/", (req, res, next) => {
  return res.status(200).json(items);
});

router.post("/", (req, res, next) => {
  const newItem = {
    name: req.body.name || "",
    price: req.body.price || 0,
  };
  items.push(newItem);
  return res.status(200).json({ added: newItem });
});

router.get("/:name", (req, res, next) => {
  const name = req.params.name;
  const foundItem = items.find((item) => item.name === name);
  return res.status(200).json(foundItem || {});
});

router.patch("/:name", (req, res, next) => {
  const name = req.params.name;
  const foundItem = items.find((item) => item.name === name);
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  return res.status(200).json({ updated: foundItem || {} });
});

router.delete("/:name", (req, res, next) => {
  const name = req.params.name;
  const foundItem = items.find((item) => item.name === name);
  const index = items.indexOf(foundItem)
  if (index > 0) items.splice(index, 1)
  return res.status(200).json({ message: "Deleted" });
});

module.exports = router;
