const API = 'https://raw.githubusercontent.com/inviskahuna/online-store-api/master/responses';

class ProductsList {
    constructor() {
        this.products = [];
        this.allProducts = [];
        this.articul = 0;
        this._getProducts();
    }

    _getProducts() {
        fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.products = [...data];
                this.render()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render())
        });
        // Создаем свой эвент после рендера всех товаров
        let event = new Event('build_done');
        document.dispatchEvent(event)
    }

    sumPrice() {
        return this.allProducts.reduce((accumulator, item) => accumulator += item.price_p, 0)
    }

    addItem2basket(basket) {
        this.allProducts.forEach(product => {
            let button = document.getElementsByClassName(product.title_p);
            button[0].addEventListener("click", function () {
                product.button_p = `<input type=\"button\" value=\"Удалить\" 
                                    class=\"btn btn-sm delete_${product.title_p} btn-outline-danger\">`; // .toLowerCase()
                basket.addItem(product.title_p, product.price_p, product.button_p);
                basket.render();
                let event2 = new Event('addNewProduct2Basket');
                document.dispatchEvent(event2);
            });
        });
    }
    //             // При нажатии на кнопку "В корзину" создается товар в корзине и к нему кнопка удаления с колбэком
    //         });
    // let deleteClassName = `delete_${product.title_p}`;
    // let delButton = document.getElementsByClassName(deleteClassName);
    // console.log(delButton);
    // if (delButton.length > 0) {
    //     delButton[0].addEventListener("click", function () {
    //         console.log("delButton");
    //         basket.removeItem(product.title_p);
    //         basket.render();
    //     });
    // }
}


class Product {
    constructor(product) {
        this.title_p = product.title_p;
        this.price_p = product.price_p;
        this.sign_p = product.sign_p;
        this.img_p = product.img_p;
        this.count_p = product.count_p;
        this.link_p = product.link_p;
        this.number_p = product.number_p;
        this.button_p = product.button_p;
    }

    render() {
        return `<div class="product-item small">
                <div class="card text-center m-1 mt-3" style="width: 18rem; min-height: 20rem;">
                    <a href="#"><img class="card-img-top mt-2" src=${this.img_p} alt="${this.title_p}"></a>
                    <div class="card-body">
                        <h4 class="card-title">${this.title_p}</h4>
                        <h6 class="card-text text-danger">${this.price_p} $</h6>
                    </div>
                    <p class="card-text">${this.title_p}</p>
                    <input type="button" value="В корзину" class="btn btn-primary ${this.title_p}"> 
                </div>
            </div>`
    }
}

class BasketItem extends Product {
    render() {
        this.sum_p = this.count_p * this.price_p;
        return `
        <div class="row justify-content-between mb-1">
            <span class="col-sm">${this.number_p}</span>
            <span class="col-sm">${this.title_p}</span>
            <span class="col-sm">${this.price_p}</span>
            <span class="col-sm">${this.count_p}</span>
            <span class="col-sm">${this.sum_p}</span>
            <span class="col-sm">${this.button_p}</span>
            <hr>
        </div>
        `;
    }
}

class Basket {
    constructor() {
        this.items = []; // массив хранит все товары выбранные пользователем
        this.item = {};
        this.number = 1; // порядковый номер для таблицы начинатеся с 1
    }

    addListeners() {
        // let basket = new Basket();
        console.log(`.delete_${this.item.title}`);
        let button = document.getElementsByClassName(`delete_${this.item.title}`); // document.querySelector(`.delete_${this.item.title}`);
        console.log(button.item(0));
        button[0].addEventListener("click", function () {
            console.log("HHHHHHHHHHHH");
            // this.removeItem(this.item);
            // this.render();
        });
    }

    addItem(title, price, button) {
        let number = this.number;
        this.item = {title};
        const isExist = (this.items.filter(i => i.title === title));
        if (isExist.length === 0) { // Если товар впервые в корзине
            let count = 1;
            number = this.number++; // считаем номер в таблице
            // console.log(title, price, number);

            this.items.push({title, price, count, number, button});
        } else { // Если уже такой товар есть в корзине
            isExist[0].count++; // увеличить количество
        }
    }

    removeItem(title) {
        const isExist = (this.items.filter(i => i.title === title));
        if (isExist.length === 1) {
            this.items.splice(this.items.indexOf(title), 1)
        } else {
            console.log(this.items.title);
        }
    }

    render() {
        let listHtml = '';
        this.items.forEach(item => {
            const goodItem = new BasketItem({
                "title_p": item.title, "price_p": item.price,
                "count_p": item.count, "number_p": item.number, "button_p": item.button
            });
            listHtml += goodItem.render();
        });
        document.querySelector('.user_basket').innerHTML = listHtml;
    }
}

let basket_inst = new Basket();
let products_inst = new ProductsList(basket_inst);

document.addEventListener('build_done', function () {

    console.log(products_inst.sumPrice());
    products_inst.addItem2basket(basket_inst);

}, false);


document.addEventListener('addNewProduct2Basket', function () {
    console.log("addNewProduct2Basket");
    basket_inst.addListeners();
}, false);