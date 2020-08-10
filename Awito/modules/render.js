const render = (base, filterKey) => {
    
    const catalog = document.querySelector('.catalog');
    catalog.textContent = '';
    
    function renderAll (item, index) {

        const card = document.createElement('li');
            card.classList.add('card');
            card.setAttribute('data-id', index);
            card.innerHTML = `
                <img class="card__image" src="data:image/jpeg;base64, ${item.image}" alt="картинка">
                <div class="card__description">
                    <h3 class="card__header">${item.nameItem}</h3>
                    <div class="card__price">${item.costItem} ₽</div>
                </div>
            `;
            catalog.append(card);
    };

    if (filterKey === 'all') {
        base.forEach((item, index) => renderAll(item, index))    
    } else {
        base.forEach((item, index) => {
            if (filterKey === item.category) renderAll(item, index)
            }
        );
        //проверка на отсутствие объявлений в указанной категории
        let i = 0;
        base.forEach((item, index) => {
            if (filterKey !== item.category) i++;    
        });
        if (base.length === i) 
        catalog.textContent = "К сожалению, в данной категории объявления отсутствуют.";
    }
    
};

export default render;