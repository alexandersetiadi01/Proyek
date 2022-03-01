const express = require("express");
const cors = require("cors");
const argon2 = require("argon2");
const app = express();
/*var corsOptions = {
  origin: "http://localhost:8081"
};*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync(
 /*{ force: true }).then(() => {
  console.log("Drop and re-sync db.");

}*/
);

require("./routes/masterBarangRoutes")(express, app);
require("./routes/barangMasukRoutes")(express, app);
require("./routes/barangKeluarRoutes")(express, app);
require("./routes/historyRoutes")(express, app);
require("./routes/inventoryRoutes")(express, app);
require("./routes/userRoutes")(express, app);
require("./routes/proyekRoutes")(express, app);
require("./routes/purchasingRoutes")(express, app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


/*
app.get("/", (req, res) => {
  res.json({ message: "testing backend" });
});
*/