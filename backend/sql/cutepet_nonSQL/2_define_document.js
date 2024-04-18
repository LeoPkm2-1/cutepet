class NguoiDungChuaChinhThuc {
	constructor(ten, tai_khoan, mat_khau, email, active_code, thoi_han) {
		this.ten = ten;
		this.tai_khoan = tai_khoan;
		this.mat_khau = mat_khau;
		this.email = email;
		this.active_code = active_code;
		this.thoi_han = thoi_han;
	}
}

module.exports = {
	NguoiDungChuaChinhThuc,
};
