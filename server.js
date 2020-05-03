const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "viade_en1b")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "viade_en1b", "viade_en1b", "index.html"));
});
app.listen(3000);
