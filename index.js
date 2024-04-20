const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const _ = require("express-group-routes");
const db = require("./models");
const http = require("http");
const {
  AdminRoutes,
  GuestsRoutes,
  ReservationRoutes,
  RoomRoutes,
} = require("./src/routes");
const multer = require("multer");

// Initialization
const app = express();
const server = http.createServer(app);

// Utilization
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "https://cdn.tailwindcss.com/"],
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Sequelize Initialization
db.sequelize
  .sync()
  .then(() => {
    console.log("\u001b[" + 32 + "m" + "Connection Established" + "\u001b[0m");
  })
  .catch((err) => {
    console.log("Failed at: " + err.message);
  });

// Group Routes
app.group("/api/v1", (router) => {
  router.use("/admin", multer().none(), AdminRoutes);
  router.use("/guests", multer().none(), GuestsRoutes);
  router.use("/reservations", multer().none(), ReservationRoutes);
  router.use("/rooms", multer().none(), RoomRoutes);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Server Configuration
server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Aichi API listening at http://%s:%s", host, port);
});
