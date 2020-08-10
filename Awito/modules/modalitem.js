import render from './render.js';
import modalClose from './modalclose.js';

const modalItem = (modalItemElem, modalAddElem, base) => {
    const catalog = document.querySelector('.catalog'),
          btnBuy = document.querySelector('.btn__buy'),
          imgCard = document.querySelector('.modal__image-item'), // src=
          nameCard = document.querySelector('.modal__header-item'), //textcontent=
          statusCard = document.querySelector('.modal__status-item'),
          descriptionCard = document.querySelector('.modal__description-item'),
          costCard = document.querySelector('.modal__cost-item'),
          btnDelete = document.querySelector('.btn__delete');
    

    catalog.addEventListener('click', (e) => {
  
        if (e.target.closest('.card')) {
            
            modalItemElem.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            modalItemElem.addEventListener('click', modalClose);
            document.addEventListener('keydown', modalClose);

            const cardId = +e.target.closest('li').dataset.id;
            modalItemElem.setAttribute('data-id', cardId);

            // base[cardId] - так можно быстрей обратиться к нашей БД

            base.find((item, index) => {
                if (index === cardId) {
                    imgCard.src = `data:image/jpeg;base64, ${item.image}`;
                    nameCard.textContent = item.nameItem;
                    statusCard.textContent = item.status === 'old' ? 'Б/у' : 'Новый';
                    descriptionCard.textContent = item.descriptionItem;
                    costCard.textContent = item.costItem + " ₽";
                }
            });
        
            btnDelete.addEventListener('click', () => {
                if (confirm("Вы уверены, что хотите удалить это объявление?")) {
                    base.splice(+modalItemElem.dataset.id, 1);
                    localStorage.setItem('awito', JSON.stringify(base));
                    render(base, 'all');
                }
            });

            btnBuy.addEventListener('click', () => {
                //console.log('Нажал кнопку КУПИТЬ');
            });
        }
    });

};

export default modalItem;