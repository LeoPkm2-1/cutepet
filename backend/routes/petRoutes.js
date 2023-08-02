const express = require("express");
const router = express.Router();
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");

const petController = require("./../controllers/petControllers");

// require login routes
router.use(requireLogined);
router.get("/infor/:pet_id", petController.getPetById);
router.get("/getallowns", petController.getAllOwnPet);
router.post("/addpet", petController.addPet);

module.exports = router;
