const express = require("express");
const app = express();
const itemRoutes = require("./itemRoutes");
const ExpressError = require("./expressError")


app.use(express.json());
app.use("/items", itemRoutes);


app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});


// app.listen(5001, () => {
    //   console.log("Server is running in port 5001");
    // });
    
module.exports = app;