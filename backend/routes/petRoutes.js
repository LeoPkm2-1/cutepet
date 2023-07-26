const express = require("express");
const router = express.Router();
const petController = require("./../controllers/petControllers");

router.get("/infor/:pet_id", petController.getPetById);
router.post("/addpet", petController.addPet);

module.exports = router;
