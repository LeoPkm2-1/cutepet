class Address {
  constructor(user_id, address_object) {
    this.accountId = user_id;
    this.At = address_object;
  }
}

class ShopAddress extends Address {
  static type = "SHOP_ADDRESS";
  constructor(user_id, address_object) {
    super(user_id, address_object);
    this.type = this.constructor.type;
  }
}

module.exports = {
  ShopAddress,
};
