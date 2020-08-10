import render from './render.js';

const filter = (base, filterKey) => {
    const menu = document.querySelector('.menu');

    menu.addEventListener('click', e => {
        if (e.target.tagName !== 'A') return;

        filterKey = e.target.dataset.category;
        render(base, filterKey);
    });

};

export default filter;