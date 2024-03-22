class ShopDescription {
  static type = "SHOP_INFOR";
  constructor(
    shop_id,
    address_object = {},
    sologan = "",
    description_msg = "",
    time_serving = "",
    cover_image_Url = "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2Fanh_bia_shop.jpg?alt=media&token=3ce38cb4-2ae7-4548-9aee-375b1d2584cb"
  ) {
    this.shopId = shop_id;
    this.addressInfor = address_object;
    this.sologan = sologan;
    this.descriptionMsg = description_msg;
    this.timeServing = time_serving;
    this.coverImageUrl = cover_image_Url;
    this.type = this.constructor.type;
  }
}

module.exports = {
  ShopDescription,
};
