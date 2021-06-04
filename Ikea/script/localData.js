const BOX = { WISH: '_IKEA_WISHLIST_', CART: '_IKEA_CART_' };

const localData = {
  wishlistData: JSON.parse(localStorage.getItem(BOX.WISH)) || [],
  cartData: JSON.parse(localStorage.getItem(BOX.CART)) || [],

  updateLocalStorage(box, data) {
    localStorage.setItem(box, JSON.stringify(data));
  },

  wishlistCount() {
    const count =
      this.wishlistData.length === 0 ? '' : this.wishlistData.length;
    return count;
  },

  wishlistGet() {
    return this.wishlistData;
  },

  wishlist(id) {
    this.wishlistData.indexOf(id) === -1
      ? this.wishlistData.push(id)
      : this.wishlistData.splice(this.wishlistData.indexOf(id), 1);
    this.updateLocalStorage(BOX.WISH, this.wishlistData);
  },

  get cart() {
    return this.cartData;
  },

  cartAdd(id, goodCount) {
    const result = this.cartData.some(item => item.id === id);
    if (result) {
      for (const item of this.cartData) {
        if (item.id === id && item.count < goodCount) {
          item.count++;
        }
      }
    } else {
      this.cartData.push({ id: id, count: 1 });
    }
    this.updateLocalStorage(BOX.CART, this.cartData);
  },

  cartDelete(id) {
    this.cartData = this.cartData.filter(item => id !== item.id);
    this.updateLocalStorage(BOX.CART, this.cartData);
  },

  cartCount() {
    const count = this.cartData.length === 0 ? '' : this.cartData.length;
    return count;
  },

  getCartGoodCount(id) {
    for (const cart of this.cartData) {
      if (cart.id === id) return cart.count;
    }
  },

  setCartGoodCount(id, value) {
    for (const cart of this.cartData) {
      if (cart.id === id) {
        cart.count = value;
        this.updateLocalStorage(BOX.CART, this.cartData);
      }
    }
  },
};

export default localData;
