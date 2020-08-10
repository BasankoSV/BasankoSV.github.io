const modalClose = () => {
    const modalItemElem = document.querySelector('.modal__item'),
          modalAddElem = document.querySelector('.modal__add');
//не разобрался, как вызвать с параметрами, чтоб потом removeEventListener
    const target = event.target;

        if (target.classList.contains('modal__close') ||
        target === modalItemElem ||
        target === modalAddElem ||
        target === document.querySelector('.btn__delete') ||
        target === document.querySelector('.btn__buy') ||
        target === document.querySelector('.modal__btn-submit') ||
        event.key === 'Escape') {
            /* просто закрываем оба модальных */
            modalItemElem.classList.add('hide');
            modalAddElem.classList.add('hide');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', modalClose); 
        }
};

export default modalClose;    