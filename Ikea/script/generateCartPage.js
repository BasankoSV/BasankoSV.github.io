import cart from './cart.js';
import localData from './localData.js';
import getData from './getData.js';

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
  }
  return await response.json();
};

const sendCartData = () => {
  const cartForm = document.querySelector('.cart-form');

  cartForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(cartForm);
    formData.set('cart', JSON.stringify(localData.cart));

    sendData('https://jsonplaceholder.typicode.com/posts', formData)
      .then(() => {
        cartForm.reset();
        alert('Ваш заказ отправлен, ожидайте сообщение от оператора!');
      })
      .catch(err => console.error(err));
  });
};

const generateCartPage = () => {
  if (location.pathname.includes('cart')) {
    const cartList = document.querySelector('.cart-list'); // <ul></ul>
    const cartTotalPrice = document.querySelector('.cart-total-price');
    let totalPrice = 0;

    const createGood = ({ name, price, description, img, id, count }) => {
      const good = document.createElement('li');
      good.className = 'cart-item';

      let options = '';
      let cartGoodCount = localData.getCartGoodCount(id);
      totalPrice += cartGoodCount * price;

      for (let i = 1; i <= count; i++) {
        options += `<option value="${i}" ${
          i === cartGoodCount ? 'selected' : ''
        }>${i}</option>`;
      }

      good.innerHTML = `
            <div class="product">
              <div class="product__image-container">
                <img src="${img[0]}" alt="${name}"/>
              </div>
              <div class="product__description">
                <h3 class="product__name">
                  <a href="card.html#${id}">${name}</a>
                </h3>
                <p class="product_description-text">${description}</p>
              </div>
              <div class="product__prices">
                <div class="product__price-type product__price-type-regular">
                  <div><div class="product__total product__total-regular">${
                    price * cartGoodCount
                  }.-</div>
                    <div class="product__price-regular">${price}.-</div>
                  </div>
                </div>
              </div>
              <div class="product__controls">
                <div class="product-controls__remove">
                  <button type="button" class="btn btn-remove" data-idd="${id}">
                    <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар"/>
                  </button>
                </div>
                <div class="product-controls__quantity">
                  <select
                    title="Выберите количество"
                    aria-label="Выберите количество"
                    data-idd="${id}">
                    ${options}
                  </select>
                </div>
              </div>
            </div>
      `;
      cartList.append(good);
      return cartList;
    };

    const render = () => {
      getData.cart(localData.cart, data => {
        const cartWrapper = document.querySelector('.cart-wrapper');
        if (data.length === 0) {
          cartWrapper.innerHTML =
            "<h2 class='main-header'>Ваша корзина пуста!</h2>";
          return;
        }
        cartList.textContent = '';
        data.forEach(createGood);
        cartTotalPrice.textContent = `${totalPrice}.-`;
        totalPrice = 0;
        cart.delete();
        cart.count();
      });
    };

    render();

    cartList.addEventListener('change', e => {
      const goodCountChanged = parseInt(e.target.value);
      localData.setCartGoodCount(e.target.dataset.idd, goodCountChanged);
      render();
    });

    sendCartData();
  }
};

export default generateCartPage;
