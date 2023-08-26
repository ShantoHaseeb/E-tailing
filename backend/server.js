const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const Cloudinary = require("./cloudinary");
const io = new Server(server, {
  cors: "*",
  methods: "*",
});
require("./connection");

const RoutesUsers = require("../backend/Routes/RoutesUsers");
const RoutesFurniture = require("../backend/Routes/RoutesFurniture");
const RoutesRequests = require("./Routes/Routesrequests");
const RoutesReview = require("./Routes/RouteReview");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", RoutesUsers);
app.use("/furnitures", RoutesFurniture);
app.use("/requests", RoutesRequests);
app.use("/review", RoutesReview);

server.listen(8080, () => {
  console.log("Server is running", 8080);
});
