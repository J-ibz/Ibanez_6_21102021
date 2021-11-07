//Création app express
const express = require("express");
const app = express();

//Donne acces au chemin du system de fichier
const path = require("path");

//Import routes users & sauces
const userRoutes = require("./routes/user.routes");
const sauceRoutes = require("./routes/sauce.routes");

//Connexion à la base de donnée
const mongoose = require("mongoose");
mongoose
    .connect("mongodb+srv://user_admin:IYxBf92dBb6D22ki@cluster0.qqiet.mongodb.net/myDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

//Gestion des CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//body parser est intégré a express mtn donc on use express.json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Permet affichage image (on se sert de path)
app.use("/images", express.static(path.join(__dirname, "images")));

//Ce qu'attend le front
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
