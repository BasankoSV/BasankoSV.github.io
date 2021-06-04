import localData from './localData.js';

const cart = {
  count() {
    document.querySelector('.cart_count').textContent = localData.cartCount();
  },

  add(id, goodCount) {
    localData.cartAdd(id, goodCount);
    this.count();
  },

  delete() {
    const btnRemove = document.querySelectorAll('.btn-remove');

    btnRemove.forEach(btn =>
      btn.addEventListener('click', event => {
        localData.cartDelete(event.currentTarget.dataset.idd);
        this.count();
        location.reload(); // просто перезагружаем страницу
      })
    );
  },
};

export default cart;
