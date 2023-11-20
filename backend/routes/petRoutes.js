const express = require("express");
const router = express.Router();
const { requireLogined, nonRequireLogined } = require("../middlewares/auth");
const petMid = require("../middlewares/petMid");
const petController = require("./../controllers/petControllers");

// require login routes
router.use(requireLogined);
router.post("/infor", petController.getInforById);
router.get("/getallowns", petController.getAllOwnPet);
router.post("/addpet", petMid.addPetMiddleWare, petController.addPet);
router.post("/capnhatthongtin/:pet_id", petController.updateInfor);
router.post("/deletePet", petMid.preChangePet, petController.deletePet);
router.post("/getAllMyPets", petController.getAllMyPets);
module.exports = router;
