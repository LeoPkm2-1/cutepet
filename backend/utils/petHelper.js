const giongLoaiModel = require('./../models/giongLoaiModel');
const petModel = require('./../models/petModel');
const anhThuCungModel = require('./../models/anhThuCungModel');
const giongLoaiMatch = async (giongID, loaiID) => {
	giongID = parseInt(giongID);
	loaiID = parseInt(loaiID);
	const maloaiDB = await giongLoaiModel
		.getMaLoaiByMaGiong(giongID)
		.then((data) => {
			return data.payload;
		});
	if (maloaiDB.length == 0) {
		return false;
	}
	if (maloaiDB[0].ma_loai === parseInt(loaiID)) {
		return true;
	} else {
		return false;
	}
};

const isOwnPet = async (petid, ownerid) => {
	petid = parseInt(petid);
	ownerid = parseInt(ownerid);
	return await petModel
		.getAllOwnsPetOf(ownerid)
		.then((data) => data.payload)
		.then((petlist) => {
			return petlist.map((petinfor) => petinfor.ma_thu_cung);
		})
		.then((petid_list) => {
			return petid_list.includes(petid);
		});
};

const handleImageForAddPet = async (url, pet_id) => {
	try {
		if (typeof url === 'undefined') return undefined;
		await anhThuCungModel.capNhatAnhDaiDienThuCung(url, pet_id);
		const AnhInfor = await anhThuCungModel
			.getAnhDaiDienHienTai(pet_id)
			.then((data) => data.payload);

		return AnhInfor;
	} catch (error) {
		console.log(error);
	}
};

const getpublicImageInfor = async (pet_id, ma_loai = undefined) => {
	const AnhInfor = await anhThuCungModel
		.getAnhDaiDienHienTai(pet_id)
		.then((data) => data.payload);
	if (AnhInfor.length > 0) {
		return AnhInfor[0];
	}
	switch (ma_loai) {
		case 1:
			return {
				ma_anh: null,
				url: 'https://img.freepik.com/premium-photo/super-cute-little-beagle-rendered-style-pixar-cartoon-generative-ai_808510-519.jpg',
				ngay_cap_nhat: null,
				ma_thu_cung: pet_id,
				is_active: null,
			};
		case 2:
			return {
				ma_anh: null,
				url: 'https://img.freepik.com/free-photo/view-adorable-3d-cat_23-2150473746.jpg',
				ngay_cap_nhat: null,
				ma_thu_cung: pet_id,
				is_active: null,
			};
		case 3:
			return {
				ma_anh: null,
				url: 'https://img.freepik.com/premium-photo/baby-shark-8_780593-78.jpg',
				ngay_cap_nhat: null,
				ma_thu_cung: pet_id,
				is_active: null,
			};
		case 4:
			return {
				ma_anh: null,
				url: 'https://img.freepik.com/premium-photo/animals-dog-cat-lion-tiger-parrot-bird-panda-giraffe-hippopotamus-wolf-elephant-monkey-snake-eagle_845967-16.jpg',
				ngay_cap_nhat: null,
				ma_thu_cung: pet_id,
				is_active: null,
			};

		default:
			return {
				ma_anh: null,
				url: 'https://img.freepik.com/premium-photo/super-cute-little-beagle-rendered-style-pixar-cartoon-generative-ai_808510-519.jpg',
				ngay_cap_nhat: null,
				ma_thu_cung: pet_id,
				is_active: null,
			};
	}
};


module.exports = {
	giongLoaiMatch,
	isOwnPet,
	handleImageForAddPet,
	getpublicImageInfor,
};
