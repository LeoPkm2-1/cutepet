use cutepet_sql;
drop TABLE IF EXISTS Anh;
CREATE TABLE Anh(
    url VARCHAR(255) not NULL,
    ngay_cap_nhat TIMESTAMP not NULL DEFAULT NOW(),
    PRIMARY KEY(url)
);
commit;

DROP TABLE if EXISTS Loai;
CREATE TABLE Loai(
    ma_loai int AUTO_INCREMENT not null,
    ten_loai VARCHAR(100) not null DEFAULT '',
    PRIMARY KEY (ma_loai)
);
commit;

DROP TABLE IF EXISTS Giong;
CREATE TABLE Giong(
    ma_giong int AUTO_INCREMENT NOT NULL,
    ten_giong VARCHAR(100) NOT NULL DEFAULT '',
    ma_loai int not null,
    PRIMARY KEY(ma_giong),
    CONSTRAINT fk_Giong2Loai
    FOREIGN KEY(ma_loai) 
        REFERENCES Loai(ma_loai) 
        on UPDATE RESTRICT 
        on DELETE RESTRICT
);
commit;

DROP TABLE if EXISTS TheLoaiLich;
CREATE TABLE TheLoaiLich(
    ma_the_loai_lich int AUTO_INCREMENT NOT NULL,
    ten_the_loai_lich VARCHAR(100) NOT NULL,
    PRIMARY KEY(ma_the_loai_lich)
);
commit;

DROP TABLE if EXISTS Hagtag;
CREATE TABLE Hagtag(
    ma_hagtag VARCHAR(100) NOT NULL,
    so_luong_bai_viet int NOT NULL DEFAULT 0,
    PRIMARY KEY(ma_hagtag)

);
commit;

DROP TABLE if  EXISTS NguoiDung;
CREATE TABLE NguoiDung(
    ma_nguoi_dung int  NOT NULL AUTO_INCREMENT,
    ten VARCHAR(100) not Null DEFAULT '',
    ngay_sinh DATE,
    tai_khoan VARCHAR(100) not null DEFAULT '',
    mat_khau VARCHAR(100) not null DEFAULT '',
    email VARCHAR(100),
    so_dien_thoai VARCHAR(100),
    is_admin BOOLEAN DEFAULT false,
    gioi_tinh BOOLEAN DEFAULT NULL,
    PRIMARY KEY(ma_nguoi_dung)
);
commit;

drop table if EXISTS LaBanBe;
CREATE TABLE LaBanBe (
    ma_nguoi_dung_1 int not null,
    ma_nguoi_dung_2 int not null,
    CONSTRAINT fk_BanBe1 
        FOREIGN KEY (ma_nguoi_dung_1)
        REFERENCES NguoiDung (ma_nguoi_dung)
        on UPDATE RESTRICT 
        on DELETE RESTRICT,
    CONSTRAINT fk_BanBe2 
        FOREIGN KEY (ma_nguoi_dung_2)
        REFERENCES NguoiDung (ma_nguoi_dung)
        on UPDATE RESTRICT 
        on DELETE RESTRICT,
    PRIMARY KEY(ma_nguoi_dung_1,ma_nguoi_dung_2)     

);
commit;




drop TABLE if EXISTS LoiMoiKetBan;
CREATE TABLE LoiMoiKetBan(
    ma_nguoi_gui int not null,
    ma_nguoi_nhan int not null,
    ngay_gui TIMESTAMP not null DEFAULT NOW(),
    CONSTRAINT fk_moiketbannggui
        FOREIGN KEY (ma_nguoi_gui)
        references NguoiDung(ma_nguoi_dung)
        on UPDATE RESTRICT
        on DELETE RESTRICT,
    CONSTRAINT fk_moiketbanngnhan
        FOREIGN KEY (ma_nguoi_nhan)
        references NguoiDung(ma_nguoi_dung)
        on UPDATE RESTRICT
        on DELETE RESTRICT,
    PRIMARY KEY(ma_nguoi_gui,ma_nguoi_nhan)
);
commit;

drop TABLE if EXISTS AnhDaiDien_NguoiDung;
CREATE TABLE AnhDaiDien_NguoiDung(
    url varchar(255) not null,
    ma_nguoi_dung int not null,
    CONSTRAINT fk_AnhNguoiDung_Anh
        Foreign key(url)
        references Anh(url)
        on UPDATE RESTRICT
        on DELETE RESTRICT,
    CONSTRAINT fk_AnhNguoiDung_NguoiDung
        FOREIGN KEY(ma_nguoi_dung)
        references NguoiDung(ma_nguoi_dung)
        on UPDATE RESTRICT
        on DELETE RESTRICT,
    PRIMARY KEY(url)
);
commit;

DROP TABLE if EXISTS ThuCung;
CREATE TABLE ThuCung (
    ma_thu_cung int not NULL AUTO_INCREMENT,
    ten_thu_cung varchar(100) not null DEFAULT '',
    ngay_sinh date,
    gioi_tinh BOOLEAN DEFAULT NULL,
    ghi_chu TEXT,
    ma_giong int,
    ma_nguoi_chu int not null,
    PRIMARY KEY(ma_thu_cung),
    CONSTRAINT fk_thucung_giong
        FOREIGN KEY (ma_giong)
        REFERENCES Giong(ma_giong)
        on UPDATE RESTRICT
        on DELETE RESTRICT,
    CONSTRAINT fk_thucung_ngdung
        FOREIGN KEY (ma_nguoi_chu)
        REFERENCES NguoiDung(ma_nguoi_dung)
        on UPDATE RESTRICT
        on DELETE RESTRICT
);
commit;


DROP table if EXISTS ThongTinSucKhoe;
CREATE TABLE ThongTinSucKhoe (
    ma_thu_cung int not NULL,
    thoi_gian TIMESTAMP not NULL DEFAULT NOW(),
    can_nang FLOAT DEFAULT 0,
    chieu_cao FLOAT DEFAULT 0,
    CONSTRAINT fk_suckhoe_thucung
        FOREIGN KEY (ma_thu_cung)
        REFERENCES ThuCung(ma_thu_cung)
        on UPDATE RESTRICT
        on DELETE RESTRICT,      
    PRIMARY KEY(ma_thu_cung,thoi_gian)  
);
commit;


DROP TABLE if EXISTS Lich;
CREATE TABLE Lich(
    ma_lich int AUTO_INCREMENT not null,
    ten_lich varchar(100) not null DEFAULT '',
    mo_ta varchar(100) not Null DEFAULT '',
    gio_nhac time not null,
    ngay_dien_ra date,
    ngay_ket_thuc date, 
    tan_suat varchar(32),
    ma_the_loai_lich int not null,
    ma_thu_cung int not null, 
    PRIMARY KEY (ma_lich),
    CONSTRAINT fk_lich_theloailich
        FOREIGN KEY(ma_the_loai_lich)
        REFERENCES TheLoaiLich(ma_the_loai_lich)
        on UPDATE RESTRICT
        on DELETE RESTRICT, 
    CONSTRAINT fk_lich_thucung
        FOREIGN KEY(ma_thu_cung)
        REFERENCES ThuCung(ma_thu_cung)
        on UPDATE RESTRICT
        on DELETE RESTRICT
);
commit;