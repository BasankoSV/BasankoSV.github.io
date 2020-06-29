const button = document.querySelector('.search-button'),
        vacancyList = document.querySelector('.vacancy-list'),
        searchInput = document.querySelector('.search-input'),
        searchHeader = document.querySelector('.search-header'),
        selectRegion = document.querySelector('select');
        
        let regionNumb = '74',
            zero11 = '00000000000',
            regionName = '74 - Челябинская область',
            searchRegion = regionNumb + zero11;
        
const DBService = class {
    async getData (url) {
        const res = await fetch(url);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Не удалось получить данные: ${url}`);
            }           
    }
    getSearchResult (query, region) {        
                return this.getData(`https://opendata.trudvsem.ru/api/v1/vacancies/region/${region}?text=${query}`);
    }
}


const dbService = new DBService();

const render = () => {
    vacancyList.innerHTML ='';
    const searchString = searchInput.value.trim();
    if (!searchInput.value.trim()) {
        searchHeader.textContent = "Вы не указали профессию/специальность!";
        searchHeader.style.color = 'red';
        return;
    }
    dbService.getSearchResult(searchString, searchRegion).then((res) => {
        if (!res.meta.total) {
            searchHeader.textContent = "По Вашему запросу ничего не найдено!";
            searchHeader.style.color = 'red';
            return;
        }

        const vac = res.results.vacancies;
        vac.forEach(item => {
            const vacancy = document.createElement('li');
            searchHeader.textContent = `Результаты поиска по "${searchString}" (найдено ${res.meta.total}) : `;
            searchHeader.style.color = 'green';
            vacancy.innerHTML += `
                <div class="vacancy-card">
                    <p>
                        <h3>${item.vacancy.company.name}</h3>
                    </p>
                    <p>${item.vacancy.addresses.address[0].location || ""}</p>
                    <p>${item.vacancy.requirement.qualification || ""}</p>
                    <p>${item.vacancy.duty || ""} </p>
                    <p>
                        <h4>${item.vacancy.salary || ""}</h4>
                    </p>
                     <a href="${item.vacancy.company.url}" target="_blanc">Вакансия на сайте</a>
                </div>
            `;
            vacancyList.append(vacancy);
        });
        //console.log(vac);
    });
}

selectRegion.addEventListener('change', () => {
    regionNumb = selectRegion.selectedOptions[0].value;
    regionName = selectRegion.selectedOptions[0].text;
    searchRegion = regionNumb + zero11;
});

button.addEventListener('click', render);
searchInput.addEventListener('keydown', (e) => e.key === 'Enter' ? render() : '');
