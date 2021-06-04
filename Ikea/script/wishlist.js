import localData from './localData.js';

export const wishlist = () => {
  const btnAddWishlist = document.querySelector('.btn-add-wishlist');

  btnAddWishlist.addEventListener('click', event => {
    localData.wishlist(event.currentTarget.dataset.idd);
    btnAddWishlist.classList.toggle('contains-wishlist');
    document.querySelector('.wishlist_count').textContent =
      localData.wishlistCount();
  });
};

export const wishListCheck = id => {
  return localData.wishlistGet().includes(id) ? true : false;
};
