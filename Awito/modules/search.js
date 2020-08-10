import render from './render.js';

const search = (base, filterKey) => {
    const searchInput = document.querySelector('.search__input'),
          catalog = document.querySelector('.catalog');
    let baseSearch = [];

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {

            base.forEach(item => {
                if (item.nameItem.
                    trim().
                    toLowerCase().
                    includes(searchInput.value.trim().toLowerCase()) ||
                    item.descriptionItem.
                    trim().
                    toLowerCase().
                    includes(searchInput.value.trim().toLowerCase())) {
                    
                    baseSearch.push(item);    
                }
            });
            
            if (baseSearch.length > 0) {
                render(baseSearch, filterKey);
            } else {
                catalog.textContent = "По Вашему запросу ничего не найдено!";
                catalog.style.color = "red";
            };
            
            baseSearch = [];
            searchInput.value = '';
        };
    });

};

export default search;