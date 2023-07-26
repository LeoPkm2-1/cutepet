const express = require("express");
const router = express.Router();
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");

const petController = require("./../controllers/petControllers");

router.get("/infor/:pet_id", petController.getPetById);

// require login routes
router.use(requireLogined);
router.post("/addpet", petController.addPet);

module.exports = router;
