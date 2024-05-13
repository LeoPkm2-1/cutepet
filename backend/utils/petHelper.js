const giongLoaiModel = require("./../models/giongLoaiModel");
const petModel = require("./../models/petModel");
const anhThuCungModel = require("./../models/anhThuCungModel");
const anhModel = require("./../models/anhModel");
const ThongTinSucKhoeModel = require("./../models/ThongTInSucKhoeModel");

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
  const petinfor = await petModel
    .getPetByID(petid)
    .then((data) => (data.payload.length > 0 ? data.payload[0] : undefined));
  if (typeof petinfor === "undefined") return false;
  return petinfor.ma_nguoi_chu == ownerid;
  //   return await petModel
  //     .getAllOwnsPetOf(ownerid)
  //     .then((data) => data.payload)
  //     .then((petlist) => {
  //       return petlist.map((petinfor) => petinfor.ma_thu_cung);
  //     })
  //     .then((petid_list) => {
  //       return petid_list.includes(petid);
  //     });
};

const handleImageForAddPet = async (url, pet_id) => {
  try {
    if (typeof url === "undefined") return undefined;
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
        url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fmydog.png?alt=media&token=c6cd879f-2489-41ad-a7c5-3bda7d8aad76",
        ngay_cap_nhat: null,
        ma_thu_cung: pet_id,
        is_active: null,
      };
    case 2:
      return {
        ma_anh: null,
        url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fmycat.png?alt=media&token=e19c4ba8-70af-4717-bac5-966fd6d19223",
        ngay_cap_nhat: null,
        ma_thu_cung: pet_id,
        is_active: null,
      };
    case 3:
      return {
        ma_anh: null,
        url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fmyshark.png?alt=media&token=f7c63057-233c-4693-af8d-21d7f9e12df8",
        ngay_cap_nhat: null,
        ma_thu_cung: pet_id,
        is_active: null,
      };
    case 4:
      return {
        ma_anh: null,
        url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fmychicken.png?alt=media&token=57cb64e6-46b3-470d-9a8c-3e67789a65ba",
        ngay_cap_nhat: null,
        ma_thu_cung: pet_id,
        is_active: null,
      };

    default:
      return {
        ma_anh: null,
        url: "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fmydog.png?alt=media&token=c6cd879f-2489-41ad-a7c5-3bda7d8aad76",
        ngay_cap_nhat: null,
        ma_thu_cung: pet_id,
        is_active: null,
      };
  }
};

const handleHealthInDexForAddPet = async (pet_id, weight, height) => {
  try {
    if (typeof weight == "undefined" && typeof height == "undefined")
      return undefined;
    if (typeof weight == "undefined") {
      weight = null;
    } else if (typeof height == "undefined") {
      height = null;
    }
    return await ThongTinSucKhoeModel.addHealthIndex({ pet_id, weight, height })
      .then((data) => data)
      .catch((err) => console.log(err));
  } catch (error) {}
};

const getPublicHealthIndexInfor = async (pet_id) => {
  const data = await ThongTinSucKhoeModel.getHealthIndexAtNowByPetid(
    pet_id
  ).then((data) => data.payload);
  if (data.length <= 0) {
    return {
      ma_suc_khoe: null,
      ma_thu_cung: pet_id,
      thoi_gian: null,
      can_nang: null,
      chieu_cao: null,
    };
  }
  return data[0];
};

const isPetExist = async (pet_id) => {
  const petinfor = await petModel
    .getPetByID(pet_id)
    .then((data) => data.payload);
  return petinfor.length > 0;
};

const deleteAllImageOfPet = async (pet_id) => {
  const ds_anh = await anhThuCungModel
    .getDSAnhDaiDienThuCung(pet_id)
    .then((data) => data.payload);
  if (ds_anh.length <= 0) return;
  // console.log(ds_anh);
  const ds_ma_anh = ds_anh.map((anh) => anh.ma_anh);
  // console.log(ds_ma_anh);
  await anhThuCungModel.deleteAllAnhDaiDienThuCung(pet_id);
  await anhModel.deleteListAnhByListMaAnh(ds_ma_anh);
};

const publicInforOfPet = async (petid) => {
  petid = parseInt(petid);
  const petInfor = await petModel.getPetByID(petid).then((data) => {
    if (data.payload.length <= 0) return {};
    return data.payload[0];
  });
  if (Object.keys(petInfor).length <= 0) {
    // res.status(200).json(new Response(200, {}));
    return {};
  }
  const giong_loai = await giongLoaiModel
    .getThongTinGiongLoaiByMaGiong(petInfor.ma_giong)
    .then((data) => data.payload[0]);
  const anh = await getpublicImageInfor(petid, giong_loai.ma_loai);
  const thongtinsuckhoe = await getPublicHealthIndexInfor(petid);
  delete petInfor.ma_giong;
  return {
    ...petInfor,
    giong_loai,
    anh,
    thong_tin_suc_khoe: thongtinsuckhoe,
  };
};

const publicInforOfListPet = async (petid_list) => {
  return await Promise.all(
    petid_list.map(async (petid) => await publicInforOfPet(petid))
  );
};

// (async function () {
//   const data = await publicInforOfListPet([1,2])
//   console.log(data);
// })()

const getPetsIdOwnedByUserInListOfPetIds = async (userid, petid_list) => {
  petid_list = petid_list.map((petid) => parseInt(petid));
  userid = parseInt(userid);
  const OwnPetIdList = await petModel
    .getAllOwnsPetOf(userid)
    .then((data) => data.payload)
    .then((petList) => {
      return petList.length > 0 ? petList.map((pet) => pet.ma_thu_cung) : [];
    });
  // console.log({OwnPetIdList});
  return petid_list.filter((petid) => OwnPetIdList.includes(petid));
};

const getOwnerIdOfPet = async (petid) => {
  const data = await petModel.getPetByID(petid).then((data) => data.payload[0]);
  return typeof data == "undefined" ? null : data.ma_nguoi_chu;
};

const getAllGiongOfPetsOwnedByUser = async (user_id) => {
  const petList = await petModel
    .getAllOwnsPetOf(user_id)
    .then((data) => data.payload);
  return petList.map((pet) => pet.ma_giong);
};

const getOwnPetIdsOfUserInListOfPetIds = async (userid, petid_list = []) => {
  petid_list = petid_list.map((petid) => parseInt(petid));
  const allPetIdsOfUser = await petModel
    .getAllOwnsPetOf(userid)
    .then((data) => data.payload)
    .then((listpet) => listpet.map((pet) => pet.ma_thu_cung));

  // console.log({ allPetIdsOfUser });
  return petid_list.filter((petId) => allPetIdsOfUser.includes(petId));
};

const getDanhSachTenLoai = async () => {
  const danhsachloai = await giongLoaiModel
    .getLoai()
    .then((data) => data.payload);

  return danhsachloai.map((loai) => loai.ten_loai);
};
const getDanhSachMaLoai = async () => {
  const danhsachloai = await giongLoaiModel
    .getLoai()
    .then((data) => data.payload);

  return danhsachloai.map((loai) => parseInt(loai.ma_loai));
};

// (async function () {
//   const data = await getOwnPetIdsOfUserInListOfPetIds(2,[2,40,2001]);
//   console.log(data);
// })();

module.exports = {
  giongLoaiMatch,
  isOwnPet,
  handleImageForAddPet,
  getpublicImageInfor,
  handleHealthInDexForAddPet,
  getPublicHealthIndexInfor,
  isPetExist,
  deleteAllImageOfPet,
  publicInforOfPet,
  publicInforOfListPet,
  getPetsIdOwnedByUserInListOfPetIds,
  getOwnerIdOfPet,
  getAllGiongOfPetsOwnedByUser,
  getOwnPetIdsOfUserInListOfPetIds,
  getDanhSachTenLoai,
  getDanhSachMaLoai,
};
