const API = 'https://raw.githubusercontent.com/inviskahuna/online-store-api/master/responses';

class ProductsList {
    constructor(){
        this.products = [];
        this.allProducts = [];
        this.init();
    }
    init(){
        this._getProducts();
    }

    _getProducts () {
        fetch (`${API}/catalogData.json`)
            .then (result => result.json())

            .then (data => {
                console.log(data);
                this.products = [...data];
                this.render()
            })
            .catch (error => {
                console.log (error)
            })
    }

    render(){
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            this.allProducts.push(prod);
            block.insertAdjacentHTML('beforeend', prod.render())
        })
    }
    sumPrice () {
        return this.allProducts.reduce ((accum, item) => accum += item.price, 0);
    }
}

class Product {
    constructor(product){
        this.title_p = product.title_p;
        this.price_p = product.price_p;
        this.sign_p = product.sign_p;
        this.img_p = product.img_p;
        this.count_p = product.count_p;
        this.link_p = product.link_p
    }
    render(){
        return `<div class="product-item small">
                <div class="card text-center m-1 mt-3" style="width: 18rem; min-height: 20rem;">
                    <a href="#"><img class="card-img-top mt-2" src=${this.img_p} alt="${this.title_p}"></a>
                    <div class="card-body">
                        <h4 class="card-title">${this.title_p}</h4>
                        <h6 class="card-text text-danger">${this.price_p} $</h6>
                    </div>
                    <p class="card-text">${this.title_p}</p>
                    <input type="button" value="В корзину" class="btn btn-primary" 
                    OnClick="user.addItem('${this.title_p}', '${this.price_p}')"> 
                </div>
            </div>`
    }
}

let products = new ProductsList();
console.log(products.sumPrice());


