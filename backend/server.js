// const http = require("http");
// const app = require("./app");

// const normalizePort = (val) => {
//   const port = parseInt(val, 10);

//   if (isNaN(port)) {
//     return val;
//   }
//   if (port >= 0) {
//     return port;
//   }
//   return false;
// };
// // normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
// const port = normalizePort(process.env.PORT || "8080");
// app.set("port", port);

// //errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
// const errorHandler = (error) => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   const address = server.address();
//   const bind =
//     typeof address === "string" ? "pipe " + address : "port: " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges.");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use.");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// const server = http.createServer(app);

// server.on("error", errorHandler);
// server.on("listening", () => {
//   const address = server.address();
//   const bind = typeof address === "string" ? "pipe " + address : "port " + port;
//   console.log("Listening on " + bind);
// });

// server.listen(port);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const postRoutes = require("./routes/post");
const userRoute = require("./routes/user");

require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log("Connexion à MongoDB échouée !", e));

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/post", postRoutes);
app.use("/api/auth", userRoute);
app.listen("8080");
