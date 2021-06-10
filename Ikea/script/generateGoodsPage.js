import cart from './cart.js';
import getData from './getData.js';
import localData from './localData.js';

const generateGoodsPage = () => {
  const mainHeader = document.querySelector('.main-header');
  const title = document.querySelector('title');

  if (location.pathname.includes('goods') && location.search) {
    const search = decodeURI(location.search);
    const prop = search.split('=')[0].substring(1);
    const value = search.split('=')[1];

    if (prop === 's') {
      getData.search(value, data => {
        if (data.length === 0) {
          mainHeader.textContent = 'По Вашему запросу ничего не найдено!';
          title.textContent = 'Поиск';
        } else {
          mainHeader.textContent = 'Результат поиска:';
          title.textContent = 'Поиск';
          render(data);
        }
      });
    } else if (prop === 'wishlist') {
      getData.wishList(localData.wishlistGet(), data => {
        if (data.length === 0) {
          mainHeader.textContent = 'Список желаний пуст.';
          title.textContent = 'Список желаний';
        } else {
          mainHeader.textContent = 'Список желаний:';
          title.textContent = 'Список желаний';
          render(data);
        }
      });
    } else if (prop === 'cat' || prop === 'subcat') {
      getData.category(prop, value, data => {
        mainHeader.textContent = `${data[0].category} - ${data[0].subcategory}`;
        title.textContent = `${data[0].category} - ${data[0].subcategory}`;
        render(data);
      });
    }
  }

  function render(data) {
    const goodsList = document.querySelector('.goods-list');
    const createGood = ({ name, price, description, img, id, count }) => {
      const good = document.createElement('li');
      good.className = 'goods-list__item';
      good.innerHTML = `
            <a class="goods-item__link" href="card.html#${id}">
              <article class="goods-item">
                <div class="goods-item__img">
                  <img
                    src="${img[0]}"
                    data-second-image="${img[1]}"
                    alt="${description}"
                  />
                </div>
                ${count > 6 ? '<p class="goods-item__new">Новинка</p>' : ''}
                <h3 class="goods-item__header">${name}</h3>
                <p class="goods-item__description">${description}</p>
                <p class="goods-item__price">
                  <span class="goods-item__price-value">${price}</span>
                  <span class="goods-item__currency"> ₽</span>
                </p>
                <button ${count === 0 ? 'style="display:none;"' : ''} 
                  class="btn btn-add-card"
                  aria-label="Добравить в корзину"
                  title="Остаток на складе: ${count}"
                  data-idd="${id}"
                ></button>
              </article>
            </a>`;
      goodsList.append(good);
    };

    goodsList.addEventListener('click', event => {
      if (event.target.closest('.btn-add-card')) {
        event.preventDefault();
        const id = event.target.dataset.idd;
        const goodCount = data
          .filter(item => item.id === id)
          .map(item => item.count)
          .join('');
        cart.add(id, parseInt(goodCount));
      }
    });

    data.forEach(item => createGood(item));
    return goodsList;
  }
};

export default generateGoodsPage;
