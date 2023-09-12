const petModel = require('./../models/petModel');
const petHelper = require('./../utils/petHelper');
const giongLoaiModel = require('../models/giongLoaiModel');
const anhThuCungModel = require('../models/anhThuCungModel');
const { Response } = require('./../utils/index');

const getInforById = async (req, res) => {
	const petid = req.params.pet_id;
	const petInfor = await petModel.getPetByID(petid).then((data) => {
		if (data.payload.length <= 0) return {};
		return data.payload[0];
	});
	if (Object.keys(petInfor).length <= 0) {
		res.status(200).json(new Response(200, {}));
		return;
	}
	const giong_loai = await giongLoaiModel
		.getThongTinGiongLoaiByMaGiong(petInfor.ma_giong)
		.then((data) => data.payload[0]);
	const anh = await petHelper.getpublicImageInfor(petid, giong_loai.ma_loai);
	const thongtinsuckhoe = await petHelper.getPublicHealthIndexInfor(petid);
	delete petInfor.ma_giong;
	res.status(200).json(
		new Response(200, {
			...petInfor,
			giong_loai,
			anh,
			thong_tin_suc_khoe: thongtinsuckhoe,
		})
	);
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
	const PET_INSERT_OK = 'thêm thú cưng thành công';
	try {
		const userInfor = req.auth_decoded;
		const ma_nguoi_chu = userInfor.ma_nguoi_dung;
		const { ma_loai, ma_giong, ten_thu_cung,can_nang,chieu_cao } = req.body;
		// kiểm tra tên tồn tại
		const petInfor = await petModel
			.getPetByNameAndUserID(ten_thu_cung, ma_nguoi_chu)
			.then((data) => data.payload);
		if (petInfor.length !== 0) {
			throw new Error(PET_EXIST_MESSAGE);
		}
		// kiểm tra giống loài có phù hợp không
		let match = await petHelper.giongLoaiMatch(ma_giong, ma_loai);
		if (!match) {
			throw new Error(PET_SPECIES_AND_GENUS_NOT_MATCH);
		}
		const { ngay_sinh, gioi_tinh, ghi_chu, url_anh } = req.body;
		// console.log('url:', url_anh);
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
		const ma_thu_cung = (petInsertStatus.insertId = Number(
			petInsertStatus.insertId
		));
		await petHelper.handleImageForAddPet(url_anh);
		const anhInfor = await petHelper.getpublicImageInfor(ma_thu_cung, ma_loai);
		await petHelper.handleHealthInDexForAddPet(ma_thu_cung,can_nang,chieu_cao)
		const thongTinSucKhoe = await petHelper.getPublicHealthIndexInfor(ma_thu_cung);
		const giong_loai = await giongLoaiModel
			.getThongTinGiongLoaiByMaGiong(ma_giong)
			.then((data) => data.payload[0]);
		res.status(200).json(
			new Response(
				200,
				{
					ma_thu_cung,
					ten_thu_cung,
					ngay_sinh,
					gioi_tinh,
					giong_loai,
					anh: anhInfor,
					thong_tin_suc_khoe: thongTinSucKhoe,
				},
				PET_INSERT_OK
			)
		);
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

const updateInfor = async (req, res) => {
	const petid = req.params.pet_id;
	const userid = req.auth_decoded.ma_nguoi_dung;

	const DONT_OWN_THIS_PET =
		'Người dùng không thể chỉ sửa thú cưng mà không sở hữu';
	const SPECIES_NOT_MATCH = 'giống không tồn tại';

	try {
		let flag = await petHelper.isOwnPet(petid, userid);
		if (!flag) {
			throw new Error(DONT_OWN_THIS_PET);
		}
		const { ten_thu_cung, ngay_sinh, gioi_tinh, ghi_chu, ma_giong } =
			req.body;
		flag = await giongLoaiModel.isMaGiongExist(ma_giong);
		if (!flag) {
			throw new Error(SPECIES_NOT_MATCH);
		}
		const respone = await petModel.updatePetInfor(
			petid,
			ten_thu_cung,
			ngay_sinh,
			gioi_tinh,
			ghi_chu,
			ma_giong
		);
		if (respone.status === 200) {
			res.status(200).json(
				new Response(200, [], 'cập nhật thú cưng thành công')
			);
		} else {
			res.status(400).json(
				new Response(400, [], respone.message, 300, 300)
			);
			throw new Error(respone.message);
		}
	} catch (error) {
		switch (error.message) {
			case DONT_OWN_THIS_PET:
				res.status(400).json(
					new Response(400, [], DONT_OWN_THIS_PET, 300, 300)
				);
				return;
			case SPECIES_NOT_MATCH:
				res.status(400).json(
					new Response(400, [], SPECIES_NOT_MATCH, 300, 300)
				);

			default:
				console.log(error);
				break;
		}
	}
};
module.exports = {
	getInforById,
	getAllOwnPet,
	addPet,
	updateInfor,
};
