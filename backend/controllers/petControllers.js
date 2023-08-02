const petModel = require('./../models/petModel');
const { giongLoaiMatch } = require('./../utils/petHelper');
const { Response } = require('./../utils/index');

const getPetById = async (req, res) => {
	const petid = req.params.pet_id;
	const pet = await petModel
		.getPetByID(petid)
		.then((data) => data.payload[0]);
	res.status(200).json(new Response(200, pet, ''));
};
const getAllOwnPet = async (req, res) => {
	const userid = req.auth_decoded.ma_nguoi_dung;

	const petlist = await petModel
		.getAllOwnsPetOf(userid)
		.then((data) => data.payload);
	res.status(200).json(new Response(200, petlist, ''));
};
const addPet = async (req, res) => {
	const PET_EXIST_MESSAGE = 'thú cưng đã tồn tại';
	const PET_SPECIES_AND_GENUS_NOT_MATCH = 'loài và giống không khớp';
	try {
		const userInfor = req.auth_decoded;
		const ma_nguoi_chu = userInfor.ma_nguoi_dung;
		const { ma_loai, ma_giong, ten_thu_cung } = req.body;
		// kiểm tra tên tồn tại
		const petInfor = await petModel
			.getPetByNameAndUserID(ten_thu_cung, ma_nguoi_chu)
			.then((data) => data.payload);
		if (petInfor.length !== 0) {
			throw new Error(PET_EXIST_MESSAGE);
		}
		// kiểm tra giống loài có phù hợp không
		let match = await giongLoaiMatch(ma_giong, ma_loai);
		if (!match) {
			throw new Error(PET_SPECIES_AND_GENUS_NOT_MATCH);
		}
		const { ngay_sinh, gioi_tinh, ghi_chu } = req.body;
		const petInsertStatus = await petModel
			.addPet(
				ten_thu_cung,
				ngay_sinh,
				gioi_tinh,
				ghi_chu,
				ma_giong,
				ma_nguoi_chu
			)
			.then((data) => {
				return data.payload;
			});
		res.status(200).json(new Response(200, 'thêm thành công', ''));
		return;
	} catch (error) {
		switch (error.message) {
			case PET_EXIST_MESSAGE:
				res.status(400).json(
					new Response(
						400,
						[],
						'tên thú cưng đã tồn tại, vui lòng chọn 1 con thú khác',
						300,
						300
					)
				);
				break;
			case PET_SPECIES_AND_GENUS_NOT_MATCH:
				res.status(400).json(
					new Response(
						400,
						[],
						'loài và giống không phù hợp với nhau',
						300,
						300
					)
				);
				break;
		}
	}
};
module.exports = {
	getPetById,
	getAllOwnPet,
	addPet,
};
