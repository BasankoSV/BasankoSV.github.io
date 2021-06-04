const PARAM = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['category', 'subcategory', 'name', 'description'],
};

const getData = {
  url: 'database/dataBase.json',

  async getData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }
    return await response.json();
  },

  get(process) {
    this.getData(this.url)
      .then(process)
      .catch(err => console.error(err));
  },

  item(value, callback) {
    this.get(data => {
      const result = data.find(item => item.id === value);
      callback(result);
    });
  },

  cart(list, callback) {
    this.get(data => {
      const result = data.filter(item => list.some(obj => obj.id === item.id));
      callback(result);
    });
  },

  search(value, callback) {
    this.get(data => {
      const result = data.filter(item => {
        for (const prop in item) {
          if (
            PARAM.search.includes(prop) &&
            item[prop].toLowerCase().includes(value.toLowerCase())
          )
            return true;
        }
      });
      callback(result);
    });
  },

  category(prop, value, callback) {
    this.get(data => {
      const result = data.filter(
        item => item[PARAM[prop]].toLowerCase() === value.toLowerCase()
      );
      callback(result);
    });
  },

  wishList(list, callback) {
    this.get(data => {
      const result = data.filter(item => list.includes(item.id));
      callback(result);
    });
  },

  catalog(callback) {
    this.get(data => {
      // const result = [...new Set(data.map(item => item.category))]; - думаю, так проще!
      const result = data.reduce((arr, item) => {
        if (!arr.includes(item.category)) {
          arr.push(item.category);
        }
        return arr;
      }, []);
      callback(result);
    });
  },
  subCatalog(value, callback) {
    /* this.get(data => {
      const result = [
        ...new Set(
          data
            .filter(item => item.category === value)
            .map(item => item.subcategory)
        ),
      ];
      callback(result);
    }); - проще ли? */

    this.get(data => {
      const result = data.reduce((arr, item) => {
        if (!arr.includes(item.subcategory) && item.category === value) {
          arr.push(item.subcategory);
        }
        return arr;
      }, []);
      callback(result);
    });
  },
};

export default getData;
