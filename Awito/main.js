'use strict';

import modalItem from './modules/modalitem.js';
import modalAddNew from './modules/modaladdnew.js';
import render from './modules/render.js';
import filter from './modules/filter.js';
import search from './modules/search.js';

const modalItemElem = document.querySelector('.modal__item'),
      modalAddElem = document.querySelector('.modal__add');

let base = [];
let filterKey = 'all';

if (localStorage.getItem('awito')) {
    base = JSON.parse(localStorage.getItem('awito'));
    render(base, filterKey);
} else document.querySelector('.catalog').textContent = 'Пока объявлений нет, будь первым!';

search(base, filterKey);
filter(base, filterKey);
modalItem(modalItemElem, modalAddElem, base);
modalAddNew(modalItemElem, modalAddElem, base, filterKey);