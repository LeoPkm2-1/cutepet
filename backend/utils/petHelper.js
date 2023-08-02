const petModel = require('./../models/giongLoaiModel');
const giongLoaiMatch = async (giongID, loaiID) => {
	giongID = parseInt(giongID);
	loaiID = parseInt(loaiID);
	const maloaiDB = await petModel.getMaLoaiByMaGiong(giongID).then((data) => {
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

module.exports = {
	giongLoaiMatch,
};
