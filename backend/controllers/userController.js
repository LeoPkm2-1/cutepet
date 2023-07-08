const { getUserDataById } = require('./../models/userModel');
const getUserDataController = (req, res) => {
	const id = req.params.id;
	getUserDataById(id)
		.then((val) => {
			res.status(200).json(val);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send(err);
		});
};
