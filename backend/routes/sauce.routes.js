const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer.config");

const sauceCtrl = require("../controllers/sauce.controller");

router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", multer, auth, sauceCtrl.createSauce);
router.put("/:id", multer, auth, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

module.exports = router;

/* /!\ Ordre des middleware important /!\ */

/*
Si on place multer avant middleware d'auth, les images des requête non authentifiées seront enregistrées dans le serveur.
*/
