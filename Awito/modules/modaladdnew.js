import render from "./render.js";
import modalClose from './modalclose.js';

const modalAddNew = (modalItemElem, modalAddElem, base, filterKey) => {
    const buttonAdd = document.querySelector('.add__ad'),
          modalImageAdd = document.querySelector('.modal__image-add'),
          modalFileInput = document.querySelector('.modal__file-input'),
          modalSubmitForm = document.querySelector('.modal__submit'),
          modalBtnSubmit = document.querySelector('.modal__btn-submit'),
          modalBtnWarning = document.querySelector('.modal__btn-warning'),
          modalFileBtn = document.querySelector('.modal__file-btn');     
    
    buttonAdd.addEventListener('click', (e) => {
        modalAddElem.classList.remove('hide');
        modalBtnSubmit.disabled = true;
        document.body.style.overflow = 'hidden';

        modalAddElem.addEventListener('click', modalClose);
        document.addEventListener('keydown', modalClose);

        modalImageAdd.src = './img/no_photo.jpg';
        modalSubmitForm.nameItem.value = '';
        modalSubmitForm.descriptionItem.value = '';
        modalSubmitForm.costItem.value = '';
        //modalSubmitForm.reset(); //очистить форму, отключил, т.к., не очищает картинку
    });
    
    let cardImg = '', 
        imgSize = 0,
        modalFileBtnText = modalFileBtn.textContent;

    modalFileInput.addEventListener('change', event => {
        //cardImg = modalSubmitForm.image.value.replace('C:\\fakepath\\', './img/'); //была просто ссылка на картинку
        
        const target = event.target,
              reader = new FileReader(),
              file = target.files[0];
              
              if (!file) return;
              imgSize = file.size;
        
        reader.readAsBinaryString(file);
        reader.addEventListener('load', event => {

            if (imgSize < 500000) {
                cardImg = btoa(event.target.result);
                modalImageAdd.src = `data:image/jpeg;base64, ${cardImg}`;
                modalFileBtn.textContent = modalFileBtnText;
                modalFileBtn.style.background = "";
            } else {
                modalFileBtn.textContent = "Размер файла не должен превышать 500 кб!";
                modalFileBtn.style.background = "red";
            }    
        });
    });

    modalSubmitForm.addEventListener('input', () => {

            if (modalImageAdd.src.includes('data:image') &&
                modalSubmitForm.nameItem.value &&
                modalSubmitForm.descriptionItem.value &&
                modalSubmitForm.costItem.value) {

                modalBtnWarning.style.display = "none";
                modalBtnSubmit.disabled = false;

            } else {
                modalBtnWarning.style.display = "";
                modalBtnSubmit.disabled = true;
            }            
    });
    
    modalSubmitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let newItem = {
            //image: modalSubmitForm.image.value.replace('C:\\fakepath\\', './img/'),
            image: cardImg,
            category: modalSubmitForm.category.value,
            nameItem: modalSubmitForm.nameItem.value,
            status: modalSubmitForm.status.value,
            descriptionItem: modalSubmitForm.descriptionItem.value,
            costItem: modalSubmitForm.costItem.value
        };

        base.push(newItem);
        localStorage.setItem('awito', JSON.stringify(base));
        render(base, filterKey = modalSubmitForm.category.value);
    });
};

export default modalAddNew;
