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
		return url;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	giongLoaiMatch,
	isOwnPet,
	handleImageForAddPet,
};
