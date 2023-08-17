const { sqlQuery } = require('./index');
const { Response } = require('./../utils/index');

const getPetByID = async (petID) => {
	const sqlStmt = 'select * from ThuCung where ma_thu_cung = ?';
	return await sqlQuery(sqlStmt, petID)
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};
async function getAllOwnsPetOf(userid) {
	const sqlStmt = 'select * from ThuCung where ma_nguoi_chu = ?';
	return await sqlQuery(sqlStmt, userid)
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
}
const getPetByNameAndUserID = async (petname, userId) => {
	const sqlStmt = `select  * from ThuCung where ma_nguoi_chu=? and ten_thu_cung = ?;`;
	return await sqlQuery(sqlStmt, [userId, petname])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

const addPet = async (
	pet_name,
	pet_birthdate,
	pet_sex,
	pet_note,
	pet_species,
	owner_id
) => {
	const sqlStmt =
		'INSERT INTO ThuCung (ten_thu_cung ,ngay_sinh ,gioi_tinh ,ghi_chu ,ma_giong,ma_nguoi_chu) VALUES(?,?,?,?,?,?) ';
	return await sqlQuery(sqlStmt, [
		pet_name,
		pet_birthdate,
		pet_sex,
		pet_note,
		pet_species,
		owner_id,
	])
		.then((data) => {
			// console.log('eheh:', data);
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
};

async function updatePetInfor(
	ma_thu_cung,
	ten_thu_cung,
	ngay_sinh,
	gioi_tinh,
	ghi_chu,
	ma_giong
) {
	const sqlStmt = `UPDATE ThuCung
SET ten_thu_cung = ?, ngay_sinh =?, gioi_tinh = ?, ghi_chu = ?, ma_giong = ?
WHERE ma_thu_cung = ?;`;
	return await sqlQuery(sqlStmt, [
		ten_thu_cung,
		ngay_sinh,
		gioi_tinh,
		ghi_chu,
		ma_giong,
		ma_thu_cung,
	])
		.then((data) => {
			return new Response(200, data, '');
		})
		.catch((err) => {
			return new Response(400, [], err.sqlMessage, err.errno, err.code);
		});
}
module.exports = {
	getPetByID,
	getAllOwnsPetOf,
	getPetByNameAndUserID,
	addPet,
	updatePetInfor,
};
