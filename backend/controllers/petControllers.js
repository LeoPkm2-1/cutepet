const petModel = require("./../models/petModel");
const { Response } = require("./../utils/index");

const getPetById = async (req, res) => {
	const petid = req.params.pet_id;
	const pet = await petModel
		.getPetByID(petid)
		.then((data) => data.payload[0]);
	res.status(200).json(new Response(200, pet, ""));
};

const addPet = (req, res) => {
	const ma_nguoi_chu = 1;
	console.log(req.body);
	res.send("ahihi");
};
module.exports = {
	getPetById,
	addPet,
};
