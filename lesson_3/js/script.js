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
            prod["count_p"] += this.articul;
            this.articul++;
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render())
        });
        let event = new Event('build_done');
        document.dispatchEvent(event)

    }

    sumPrice() {
        return this.allProducts.reduce((accumulator, item) => accumulator += item.price_p, 0)
    }
}

class Product {
    constructor(product) {
        this.title_p = product.title_p;
        this.price_p = product.price_p;
        this.sign_p = product.sign_p;
        this.img_p = product.img_p;
        this.count_p = product.count_p;
        this.link_p = product.link_p
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

function querySelectorFunc(productsList) {
    console.log(productsList["allProducts"][0].title_p);
}

// let button = document.querySelector("btn");
// button.addEventListener("click", function() {
//     console.log("Кнопка нажата.");
// });

let products_inst = new ProductsList();


document.addEventListener('build_done', function () {
    console.log(products_inst.sumPrice());
    querySelectorFunc(products_inst)
}, false);
