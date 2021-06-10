import { wishlist, wishListCheck } from './wishlist.js';
import cart from './cart.js';
import getData from './getData.js';

const generateCardPage = () => {
  if (location.hash) {
    //карточка одного товара
    getData.item(location.hash.substring(1), data => {
      const {
        category,
        subcategory,
        name,
        id,
        description,
        img,
        count,
        price,
      } = data;
      const title = document.querySelector('title');
      title.textContent = category;
      const breadcrumbList = document.querySelector('.breadcrumb__list');
      const breadcrumbListItem = `
              <li class="breadcrumb__list-item">
                <a href="goods.html?cat=${category}" class="breadcrumb__link">
                <span>${category}</span></a>
              </li>
              <li class="breadcrumb__list-item">
                <a href="goods.html?subcat=${subcategory}" class="breadcrumb__link">
                <span>${subcategory}</span></a>
              </li>
              <li class="breadcrumb__list-item">
                <a href="#${id}" class="breadcrumb__link">
                <span>${name}</span></a>
              </li>
            `;
      breadcrumbList.insertAdjacentHTML('afterbegin', breadcrumbListItem);
      const goodWrapper = document.querySelector('.good');
      const good = `
              <div class="good-images">
                <div class="good-image__item">
                  ${
                    (img[0] && '<img src=' + img[0] + ' alt=' + name + ' />') ||
                    '<p>Нет картинки</p>'
                  } 
                </div>
                <div class="good-image__item">
                ${
                  (img[1] && '<img src=' + img[1] + ' alt=' + name + ' />') ||
                  '<p>Нет картинки</p>'
                }
                </div>
              </div>
              <div class="good-item${count === 0 ? ' not-in-stock' : ''}">
                <!-- not-in-stock - нет в наличии-->
                <p class="good-item__new">Новинка</p>
                <div class="good-item__section">
                  <div>
                    <h2 class="good-item__header">${name}</h2>
                    <p class="good-item__description">${description}</p>
                  </div>
                  <p class="good-item__price">
                    <span class="good-item__empty">Нет в наличии</span>
                    <span class="good-item__price-value">${price}</span>
                    <span class="good-item__currency">₽</span>
                  </p>
                </div>
                <div class="good-item__buttons">
                  <button type="button" class="btn btn-good" title="Остаток на складе: ${count}" data-idd="${id}">
                    <svg focusable="false" viewBox="0 0 24 24" class="btn-good-svg" aria-hidden="true">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.4372 4H10.9993H12.0003H12.9996H13.5616L13.8538 4.48014L17.2112 9.99713H21H22.2806L21.9702 11.2396L21.5303 13H19.4688L19.7194 11.9971H4.28079L5.59143 17.2397C5.70272 17.6848 6.1027 17.9971 6.56157 17.9971H15V19.9971H6.56157C5.18496 19.9971 3.98502 19.0602 3.65114 17.7247L2.02987 11.2397L1.71924 9.99713H3.00002H6.78793L10.145 4.48017L10.4372 4ZM12.4375 6L14.87 9.99713H9.12911L11.5614 6H12.0003H12.4375ZM17.9961 16V14H19.9961V16H21.9961V18H19.9961V20H17.9961V18H15.9961V16H17.9961Z"
                      ></path>
                    </svg>
                    <span class="btn-good__label">Добавить в корзину</span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-add-wishlist${
                      wishListCheck(id) ? ' contains-wishlist' : ''
                    }"
                    data-idd="${id}"
                  >
                    <svg
                      focusable="false" viewBox="0 0 24 24" class="btn-add-wishlist__svg" aria-hidden="true">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12.336 5.52055C14.2336 3.62376 17.3096 3.62401 19.2069 5.52129C20.2067 6.52115 20.6796 7.85005 20.6259 9.15761C20.6151 12.2138 18.4184 14.8654 16.4892 16.6366C15.4926 17.5517 14.5004 18.2923 13.7593 18.8036C13.3879 19.0598 13.0771 19.2601 12.8574 19.3973C12.7475 19.466 12.6601 19.519 12.5992 19.5555C12.5687 19.5737 12.5448 19.5879 12.5279 19.5978L12.5079 19.6094L12.502 19.6129L12.5001 19.614C12.5001 19.614 12.4989 19.6147 11.9999 18.748C11.501 19.6147 11.5005 19.6144 11.5005 19.6144L11.4979 19.6129L11.4919 19.6094L11.472 19.5978C11.4551 19.5879 11.4312 19.5737 11.4007 19.5555C11.3397 19.519 11.2524 19.466 11.1425 19.3973C10.9227 19.2601 10.612 19.0598 10.2405 18.8036C9.49947 18.2923 8.50726 17.5517 7.51063 16.6366C5.58146 14.8654 3.38477 12.2139 3.37399 9.15765C3.32024 7.85008 3.79314 6.52117 4.79301 5.52129C6.69054 3.62376 9.76704 3.62376 11.6646 5.52129L11.9993 5.856L12.3353 5.52129L12.336 5.52055ZM11.9999 18.748L11.5005 19.6144L11.9999 19.9019L12.4989 19.6147L11.9999 18.748ZM11.9999 17.573C12.1727 17.462 12.384 17.3226 12.6236 17.1573C13.3125 16.6821 14.2267 15.9988 15.1366 15.1634C17.0157 13.4381 18.6259 11.2919 18.6259 9.13506V9.11213L18.627 9.08922C18.6626 8.31221 18.3844 7.52727 17.7926 6.9355C16.6762 5.81903 14.866 5.81902 13.7495 6.9355L13.7481 6.93689L11.9965 8.68166L10.2504 6.9355C9.13387 5.81903 7.3237 5.81903 6.20722 6.9355C5.61546 7.52727 5.33724 8.31221 5.3729 9.08922L5.37395 9.11213V9.13507C5.37395 11.2919 6.98418 13.4381 8.86325 15.1634C9.77312 15.9988 10.6874 16.6821 11.3762 17.1573C11.6159 17.3226 11.8271 17.462 11.9999 17.573Z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            `;
      goodWrapper.insertAdjacentHTML('afterbegin', good);

      const btnCart = document.querySelector('.btn-good');
      btnCart.addEventListener('click', event => {
        cart.add(event.currentTarget.dataset.idd, data.count);
      });

      wishlist();
    });
  }
};

export default generateCardPage;
