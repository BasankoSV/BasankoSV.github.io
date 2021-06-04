import getData from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

const catalog = () => {
  const updateSubCatalog = generateSubCatalog();

  const btnBurger = document.querySelector('.btn-burger');
  const catalog = document.querySelector('.catalog');
  const subCatalog = document.querySelector('.subcatalog');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.insertAdjacentElement('beforeend', overlay); // document.body.append(overlay);

  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  };

  const closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    subCatalog.classList.remove('subopen');
  };

  const closeSubMenu = event => {
    if (event.target.closest('.btn-return')) {
      subCatalog.classList.remove('subopen');
    }
  };

  const handlerCatalog = event => {
    event.preventDefault();
    const target = event.target;
    const itemList = target.closest('.catalog-list__item');
    if (itemList) {
      getData.subCatalog(target.textContent, data => {
        updateSubCatalog(target.textContent, data);
        subCatalog.classList.add('subopen');
      });
    }

    if (target.closest('.btn-close')) {
      closeMenu();
    }
  };

  btnBurger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click', handlerCatalog);
  subCatalog.addEventListener('click', closeSubMenu);

  document.addEventListener(
    'keydown',
    event => event.code === 'Escape' && closeMenu()
  );
};

export default catalog;
